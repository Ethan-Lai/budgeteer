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

const Register = () => {
    const registerUser = async (formData) => {
        const data = Object.fromEntries(formData)
        try {
            const response = await axios.post('/api/auth/register', {
                email: data.email,
                password: data.password
            })
            console.log('User created', response.data)
        } catch (err) {
            console.log('Error:', err)
        }
    }

    return (
        <Card className="w-1/3">
            <CardHeader>
                <CardTitle>Create an Account</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={registerUser}>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                    <br />
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required />
                    <br />
                    <Button type="submit">Register</Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default Register