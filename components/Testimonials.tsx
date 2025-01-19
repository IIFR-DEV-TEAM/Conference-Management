const testimonials = [
  {
    name: 'Sarah Thompson',
    role: 'Event Organizer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote: 'This platform has revolutionized how we manage our annual tech conference. It\'s intuitive, powerful, and has saved us countless hours of work.',
  },
  {
    name: 'Michael Chen',
    role: 'Conference Director',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote: 'The analytics feature has provided us with invaluable insights, helping us improve our conference year after year. Highly recommended!',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-white py-12 md:py-20 lg:py-24" id="testimonials">
      <div className="max-w-7xl mx-auto md:grid md:grid-cols-2 md:px-6 lg:px-8">
        <div className="py-12 px-4 sm:px-6 md:flex md:flex-col md:py-16 md:pl-0 md:pr-10 md:border-r md:border-gray-200 lg:pr-16">
          <div className="md:flex-shrink-0">
            <img className="h-12" src="/placeholder.svg?height=48&width=200" alt="Company Logo" />
          </div>
          <blockquote className="mt-6 md:flex-grow md:flex md:flex-col">
            <div className="relative text-lg font-medium text-gray-800 md:flex-grow">
              <svg
                className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-gray-200"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="relative">
                {testimonials[0].quote}
              </p>
            </div>
            <footer className="mt-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 inline-flex rounded-full border-2 border-white">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={testimonials[0].image || "/placeholder.svg"}
                    alt=""
                  />
                </div>
                <div className="ml-4">
                  <div className="text-base font-medium text-gray-900">{testimonials[0].name}</div>
                  <div className="text-base font-medium text-indigo-600">{testimonials[0].role}</div>
                </div>
              </div>
            </footer>
          </blockquote>
        </div>
        <div className="py-12 px-4 border-t-2 border-gray-200 sm:px-6 md:py-16 md:pr-0 md:pl-10 md:border-t-0 md:border-l lg:pl-16">
          <div className="md:flex-shrink-0">
            <img className="h-12" src="/placeholder.svg?height=48&width=200" alt="Company Logo" />
          </div>
          <blockquote className="mt-6 md:flex-grow md:flex md:flex-col">
            <div className="relative text-lg font-medium text-gray-800 md:flex-grow">
              <svg
                className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-gray-200"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="relative">
                {testimonials[1].quote}
              </p>
            </div>
            <footer className="mt-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 inline-flex rounded-full border-2 border-white">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={testimonials[1].image || "/placeholder.svg"}
                    alt=""
                  />
                </div>
                <div className="ml-4">
                  <div className="text-base font-medium text-gray-900">{testimonials[1].name}</div>
                  <div className="text-base font-medium text-indigo-600">{testimonials[1].role}</div>
                </div>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}

