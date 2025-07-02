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
import { useNavigate } from "react-router-dom"
import { loginUser } from "@/services/authService"


const LoginForm = () => {
    const navigate = useNavigate()

    const handleLogin = async (formData) => {
        const data = Object.fromEntries(formData)
        try {
            await loginUser(data)
            navigate('/app/dashboard')
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
                <form action={handleLogin}>
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