import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const testimonials = [
    {
        name: "Antonio",
        avatar: "A",
        title: "Software Engineer",
        description: "This is the best application I've used!"
    },
    {
        name: "Roger",
        avatar: "R",
        title: "Data Analyst",
        description: "Skyrocketed my productivity to new heights!"
    },
    {
        name: "Sophia",
        avatar: "S",
        title: "Product Manager",
        description: "The features of this application are outstanding!"
    },
    {
        name: "Liam",
        avatar: "L",
        title: "UX Designer",
        description: "The user interface is intuitive and easy to use!"
    }
]


export const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
            <h1 className="text-center text-white text-4xl font-extrabold mb-10">
                Testimonials
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map((item) => (
                    <Card key={item.description} className="bg-[#192339] border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">{item.name}</p>
                                    <p className="text-zinc-400 text-sm">{item.title}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}
