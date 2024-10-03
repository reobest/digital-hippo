// server.js
const dotenv = require('dotenv')
dotenv.config({ path: './.env.local' })
const express = require('express');
const next = require('next');
const cors = require('cors');
const path = require('path')
const { v2: cloudinary } = require('cloudinary');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
const multer = require('multer')
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const MONGODB_Uri = process.env.MONGODB_URI;
console.log(process.env.MONGODB_URI);
/////////////////////////////////////
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

///////////////////////////////////////
const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_Uri);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

//////////////////////////////////////


////////// mongooose schema //////////
const productSchema = new mongoose.Schema({
  name: String,
  productDetails: String,
  price: Number,
  category: String,
  userEmail: String,
  addToCart: Boolean,
  quantity: Number,
  images: [{ type: String }]
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
    unique: true,
  }
})
//////////////////////////////
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save the files
  },
  filename: (req, file, cb) => {
    // Use the original file name or modify it as needed
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Create multer instance with storage configuration
const upload = multer({ storage });
const User = mongoose.models.User || mongoose.model('User', userSchema);

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

/////////////////////////////////
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(cors());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use('/uploads', express.static('uploads'));
  // Connect to MongoDB
  connectDB().then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
  server.post('/api/increasequantity', async (req, res) => {
    const { quantity, id } = req.body;
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      const newQuantity = (product.quantity || 1) + quantity;
      const result = await Product.updateOne(
        { _id: id },
        { $set: { quantity: newQuantity } }
      );
      res.status(200).json({ message: 'Quantity updated', messeage: "updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  server.post('/api/addtocart', async (req, res) => {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      product.addToCart = true;
      await product.save();

      res.status(200).json({ message: 'Product added to cart' });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
  server.post('/api/cartitems', async (req, res) => {
    const {email} = req.body 
    console.log("email is :",email);
    console.log(typeof email);
    
    try {
      const products = await Product.find({ "addToCart": true, "userEmail": email })
      res.status(200).json({ products })
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
  server.post('/api/add-product', upload.array('images'), async (req, res) => {
    const { name, productDetails, price, category, userEmail } = req.body;
    const images = req.files;
    console.log('Received files:', images);
    if (!images || images.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    const imageUrls = images.map(file => `http://localhost:3000/uploads/${file.filename}`);

    try {
      const uploadPromises = images.map(file => {
        return cloudinary.uploader.upload(file.path);
      });
      const uploadResults = await Promise.all(uploadPromises);
      const imageUrlS = uploadResults.map(result => result.secure_url);
      const newProduct = new Product({
        name,
        productDetails,
        price,
        category,
        userEmail,
        images: imageUrlS  // Store file names in MongoDB
      });

      await newProduct.save();
      res.status(200).json({ message: 'Product added successfully', data: newProduct,imageUrlS });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
  server.get('/api/fetchproduct', async (req, res) => {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({ product });
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
  server.get('/api/fetchsimilar', async (req, res) => {
    try {
      const products = await Product.find({}).limit(20);
      res.status(200).json({ products });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
  server.get('/api/fetchallproducts', async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json({ products });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
  server.get('/api/getproducts', async (req, res) => {
    try {
      const products = await Product.find({}).limit(4);;
      res.status(200).json({ products });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
  server.post('/api/verify-email', async (req, res) => {
    const { token } = req.body
    console.log(token + "i ama rayan");
    try {
      // Find the user with the given token
      const user = await User.findOne({ token });
      if (!user) {
        return res.status(400).json({ message: 'Invalid token' });
      }

      // Update the user's verification status
      user.isVerified = true;
      await user.save();

      res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
      console.error('Error verifying email:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }

  })
  server.get('/api/clearcart', async (req, res) => {
    try {
      const result = await Product.updateMany(
        { addToCart: true },
        { $set: { addToCart: false, quantity: 1 } }
      );
      res.status(200).json({ message: 'Cart cleared', count: result.nModified });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });

    }
  })
  server.post('/api/removefromcart', async (req, res) => {
    const { id } = req.body;
    try {
      const result = await Product.updateOne(
        { _id: id },
        { $set: { addToCart: false, quantity: 1 } }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })

  server.post('/api/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Check if the user's email is verified
      if (!user.isVerified) {
        return res.status(400).json({ message: 'Email not verified' });
      }

      // Compare the provided password with the stored plaintext password
      if (user.password !== password) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ message: 'Sign-in successful', token, email: user.email });
    } catch (error) {
      console.error('Error signing in:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  server.post('/api/signup', async (req, res) => {
    const { email, password, token } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const newUser = new User({ email, password, token });
      await newUser.save();
      ////// send a verification mail to the user ////////
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.email",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "rayanbbbkk@gmail.com",
          pass: "pddt gtpb rcfh fbju",
        },
      });
      const mailOptions = {
        from: '"Maddison Foo Koch 👻" <rayanbbbkk@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Verify Your Email', // Subject line
        html: `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
      <h2 style="color: #333;">Please Verify Your Email</h2>
      <p style="font-size: 16px; color: #555;">
        Click the button below to verify your email address and complete the registration process.
      </p>
      <a href="http://localhost:3000/virification?token=${token}" style="
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        background-color: #007bff;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
      ">
        Verify Email
      </a>
    </div>
  `,
      };

      const sendMail = async (transporter, mailOptions) => {
        try {
          await transporter.sendMail(mailOptions)
          console.log("email was sent succseesfully");

        } catch (error) {
          console.log(error);

        }
      }
      sendMail(transporter, mailOptions)
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  server.post('/api/create-payment-intent', async (req, res) => {
    try {
      const { products, amount } = req.body; // Amount in cents
      const LineItems = products.map((product) => (
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              images: [product.images[0]],
            },
            unit_amount: amount
          },
          quantity: 1,
        }
      ))
      const session = await stripe.checkout.sessions.create({
        line_items: LineItems,
        mode: "payment",
        payment_method_types: ['card'],
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      });

      res.status(200).json({ url: session.url });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = parseInt(process.env.PORT, 10) || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
