"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    name: z.string().min(2).max(50),
    productDetails: z.string().min(8, { message: "at least 8 charachters" }).max(100),
    category: z.string(),
    images: z.any().optional(),
    price: z.string().min(1),
})
const ProductForm = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            productDetails: "",
            category: "",
            images: null,
            price: "",
        },
    }) 

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        
        const formData = new FormData();
        const userEmail  =  localStorage.getItem('email')
        formData.append('name', values.name);
        formData.append('productDetails', values.productDetails);
        formData.append('price', values.price.toString());  // Convert number to string
        formData.append('category', values.category);
        if (values.images) {
            for (let i = 0; i < values.images.length; i++) {
                formData.append('images', values.images[i]);
            }
        }
        if (userEmail) {
            formData.append('userEmail', userEmail);
        }    
        try {
            const response = await fetch('https://digital-hippo-lc7e.onrender.com/api/add-product', {
                method: 'POST',
                body: formData,
            })
            if(response.ok){
                router.push('/')
            }
            const data = await response.json();
            console.log('Response from server:', data);
        } catch (error) {
            console.log(error);

        }

    }
    return (
        <div className="w-[60%]">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="productDetails"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product details</FormLabel>
                                <FormControl>
                                    <Input placeholder="The product description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price in USD</FormLabel>
                                <FormControl>
                                    <Input placeholder="price in USD" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a value" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="ui-kits">UI Kits</SelectItem>
                                        <SelectItem value="icons">Icons</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product images</FormLabel>
                                <FormControl>
                                    <Input id="picture" type="file" onChange={(e) => {
                                        field.onChange(e.target.files);
                                    }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Submit</Button>
                </form>
            </Form>
        </div>

    )
}

export default ProductForm