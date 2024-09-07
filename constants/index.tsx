import { Download, Leaf, CircleCheckBig } from "lucide-react"
export const Features = [
    {
        name: "Instant Delivery",
        description: "Get your assets delivered to your mail in seconds and download them right away.",
        icon: <Download size={16} strokeWidth={1.25} />,
    },
    {
        name: "Guaranteed Quality",
        description: "Every asset on our platform is verified by our team to ensure our highest quality standards. Not Happy? we offer a 30 days refund guarantee.",
        icon: <CircleCheckBig size={16} strokeWidth={1.25} />,
    },
    {
        name: "For the Planet",
        description: "we've pledged 1% sales to the preservation and restortion of the natural enviroment.",
        icon: <Leaf size={16} strokeWidth={1.25} />,
    },
]
export const UI_Kits = [
        {
          name: 'Editor picks',
          href: `/products?category=ui_kits`,
          imageSrc: '/nav/ui-kits/mixed.jpg',
        },
        {
          name: 'New Arrivals',
          href: '/products?category=ui_kits&sort=desc',
          imageSrc: '/nav/ui-kits/blue.jpg',
        },
        {
          name: 'Bestsellers',
          href: '/products?category=ui_kits',
          imageSrc: '/nav/ui-kits/purple.jpg',
        },
]
export const Icons = [
          {
            name: 'Favorite Icon Picks',
            href: `/products?category=icons`,
            imageSrc: '/nav/icons/picks.jpg',
          },
          {
            name: 'New Arrivals',
            href: '/products?category=icons&sort=desc',
            imageSrc: '/nav/icons/new.jpg',
          },
          {
            name: 'Bestselling Icons',
            href: '/products?category=icons',
            imageSrc: '/nav/icons/bestsellers.jpg',
          },
]
    
 
