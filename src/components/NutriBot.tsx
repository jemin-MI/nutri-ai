"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { CalendarIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, FormEvent } from "react"
import { toast } from "sonner"
import axios from "axios"
import { FormData } from "@/app/(nutri)/home/page"

// Define proper TypeScript interfaces
interface NutriBotProps {
  hasMealData: boolean
  userMetadata: FormData | null
  hasProfile: boolean
  userId: string
}

export default function NutriBot({ hasMealData, userMetadata, hasProfile, userId }: NutriBotProps) {
  const router = useRouter()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [duration, setDuration] = useState<string>()
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!duration) {
      newErrors.duration = "Please select a duration"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      if (!hasProfile) {
        toast.error("Please complete your profile first")
        return
      }
      
      try {
        setLoading(true)
        // Call your API to generate the plan
        const res = await axios.post("/api/genmeal", {
          userMetadata: userMetadata,
          planDuration: duration,
          userId: userId
        })
        if(res.status === 200 || res.status === 201) {
          toast.success("Plan generated successfully")
          router.push('/meal-plan')
        }
      } catch (error) {
        toast.error("Taking too time to generate",{
          description: "We Have Initiated the process, Check You Meal Plan after 10 sec"
        })
        console.error(error)
      } finally {
        setLoading(false)
      }
    } else {
      toast.error("Please fill in all required fields")
    }
  }

  return (
    <div className="container">
      <div className="relative mr-40 p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-neutral-700 to-neutral-300 bg-clip-text ">
            Your Personal AI Nutrition Guide
          </h2>
          <p className="text-sm text-transparent bg-gradient-to-r from-neutral-700 to-neutral-500 bg-clip-text">
            Get personalized meal plans, nutrition advice, and dietary recommendations tailored to your specific
            needs and health goals.
          </p>

          <div className="bg-[#ffe3ee] p-4 rounded-lg mb-6">
            <h3 className="font-medium text-zinc-800 mb-2">What NutriAI can do for you:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-[#d0bfff] flex items-center justify-center mt-0.5">
                  <span className="text-zinc-700 text-xs">✓</span>
                </div>
                <span className="text-sm text-gray-700">
                  Create personalized meal plans based on your profile
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-[#d0bfff] flex items-center justify-center mt-0.5">
                  <span className="text-zinc-700 text-xs">✓</span>
                </div>
                <span className="text-sm text-gray-700">
                  Provide nutritional guidance aligned with your goals
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-[#d0bfff] flex items-center justify-center mt-0.5">
                  <span className="text-zinc-700 text-xs">✓</span>
                </div>
                <span className="text-sm text-gray-700">Gives Exact Nutrition Value for the Meal</span>
              </li>
            </ul>
          </div>
        </div>

        <form className="mt-6 flex flex-col sm:flex-row justify-between pt-4 border-t gap-4" onSubmit={handleSubmit}>
        <div className="w-full sm:w-auto">
          <Select required onValueChange={(value) => setDuration(value)}>
            <SelectTrigger className="w-full sm:w-[200px] bg-[#D0BFFF] text-black border rounded-lg hover:text-black transition-colors">
            <div className="flex items-center gap-2 text-black">
              <CalendarIcon className="h-4 w-4 text-black" />
              <SelectValue placeholder="Select Plan Duration" className="text-black" />
            </div>
            </SelectTrigger>

            <SelectContent className="bg-white border text-black">
              <SelectItem value="3" className="hover:bg-[#FFC0D9] hover:text-black">3 Days</SelectItem>
              <SelectItem value="5" className="hover:bg-[#FFC0D9] hover:text-black">5 Days</SelectItem>
              <SelectItem value="7" className="hover:bg-[#FFC0D9] hover:text-black">7 Days</SelectItem>
            </SelectContent>
          </Select>
          {errors.duration && <p className="text-sm text-destructive mt-1">{errors.duration}</p>}
        </div>

          
        <div className="flex space-x-2">
          <Button 
            type="submit"
            disabled={!hasProfile || loading || hasMealData}
            className="bg-[#ffc0d9] text-black hover:bg-[#ffacc9] transition-all">
            {loading ? "Generating..." : hasMealData ? "Generated" : "Generate Plan"}
          </Button>

          {hasMealData && (
            <Button 
              type="button"
              onClick={() => router.push('/meal-plan')} 
              className="bg-[#ffc0d9] text-black hover:bg-[#ffacc9] transition-all">
              View Your Plan
            </Button>
          )}

          {!hasProfile && (
            <Button 
              type="button"
              onClick={() => router.push('/profile')} 
              className="text-black font-light border p-2  bg-[#ffc0d9] transition-all 
                        hover:bg-[#ffddbb] hover:shadow-lg hover:scale-105">
              Complete Your Profile
            </Button>
          )}
        </div>



        </form>
      </div>
    </div>
  )
}