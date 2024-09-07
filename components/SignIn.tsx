"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useRouter ,useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
const formSchema = z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(8, { message: "at least 8 charachters" }).max(100)
})
const SignIn= () => {
    const router  = useRouter()
    const searchParams = useSearchParams()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const  onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await fetch('/api/signin', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });
      
            const data = await response.json();
            if (response.ok) {
              localStorage.setItem('token', data.token);
              localStorage.setItem('email', data.email);
              window.location.reload()
              router.push('/')
              console.log('Sign-in successful:', data);
              // Handle successful sign-in, e.g., redirect or save token
            } else {
              console.error('Sign-in error:', data);
              // Handle sign-in error
            }
          } catch (error) {
            console.error('Error:', error);
          }
    }
    return (
        <div className="w-[30%]">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="password" {...field} />
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

export default SignIn