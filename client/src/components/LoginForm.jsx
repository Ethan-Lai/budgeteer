import React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"


const LoginForm = () => {
    const loginUser = async (formData) => {
        const data = Object.fromEntries(formData)
        try {
            const response = await axios.post('api/auth/login', {
                email: data.email,
                password: data.password
            })
            localStorage.setItem('token', response.data.token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
            console.log('User has been logged in', response.data)
        } catch (err) {
            console.log('Error: ', err)
        }
    }

    return (
        <Card className="w-1/3">
            <CardHeader>
                <CardTitle>Sign in</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={loginUser}>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                    <br />
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required />
                    <br />
                    <Button type="submit">Login</Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default LoginForm