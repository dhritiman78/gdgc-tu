"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Send, CheckCircle } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef(null)
  const formRef = useRef(null)

  useGSAP(() => {
    gsap.from(sectionRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 50%",
        scrub: 1,
      },
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      // Here you would typically send the email to your backend
      console.log("Submitted email:", email)
      setSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false)
        setEmail("")
      }, 3000)
    }
  }

  return (
    <div className="py-20 bg-google-blue text-white">
      <div ref={sectionRef} className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-google-sans">Join Our Community</h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Stay updated with the latest events, workshops, and opportunities from GDG Tezpur University.
          </p>
        </div>

        <div ref={formRef} className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center py-6">
              <CheckCircle className="h-16 w-16 text-google-green mx-auto mb-4" />
              <h3 className="text-gray-800 text-xl font-bold mb-2 font-google-sans">Thank You!</h3>
              <p className="text-gray-600">You've successfully subscribed to our newsletter.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent text-gray-800"
                  required
                />
                <button
                  type="submit"
                  className="bg-google-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  Subscribe
                  <Send className="h-4 w-4 ml-2" />
                </button>
              </div>
              <p className="text-gray-500 text-sm mt-4">We respect your privacy. Unsubscribe at any time.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
