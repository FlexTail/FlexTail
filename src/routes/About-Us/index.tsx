import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardImage,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
  CardDescription,
} from '@/components/Card'
import { Button } from '@/components/Button'
import { AlertDialog } from '@/components/AlertDialog'
import { useState } from 'react'

const AUTHOR = {
  name: 'Syed Arbaaz Hussain',
  github: 'https://github.com/SyedArbaazHussain',
  linkedin: 'https://www.linkedin.com/in/syed-arbaaz-hussain-7267ab228/',
  avatar: 'https://avatars.githubusercontent.com/u/69892240?v=4',
  bio: `Syed Arbaaz Hussain is a FullStack Developer from India with a deep passion for software engineering, AI, computer vision, and automation. He is the creator of FlexTail and has contributed to several impactful projects including FallSafe—a real-time fall detection system using YOLO and machine learning—and PumpCare Connect, an IoT-based platform for pump system monitoring. Arbaaz is a hackathon winner, published technical blogger, and a strong advocate for scalable design systems and developer tooling. He enjoys exploring new technologies, collaborating on open-source, and mentoring others in the tech community. You can find his work on GitHub and connect with him on LinkedIn to explore ideas or discuss innovation in tech.`,
}

const AboutUsPage = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  return (
    <main className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 text-black dark:text-white">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 md:mb-12 underline underline-offset-[1rem]">
          About FlexTail
        </h1>
        <section className="mb-10 max-w-4xl">
          <p className="text-lg">
            FlexTail is a modern, scalable UI component library built for
            performance and design flexibility. It supports commercial-grade
            internationalization, dark/light themes, and is optimized for
            developer experience.
          </p>
        </section>
      </div>

      <section className="flex flex-col items-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-8 underline underline-offset-4">
          About Author
        </h2>
        <Card layout="vertical" className="shadow-lg hover:shadow-2xl">
          <CardImage
            src={AUTHOR.avatar}
            alt={AUTHOR.name}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full"
          />
          <CardHeader></CardHeader>
          <CardContent>
            <CardTitle>{AUTHOR.name}</CardTitle>
            <CardDescription linesToShow={2}>{AUTHOR.bio}</CardDescription>
          </CardContent>
          <CardFooter>
            <Button variant="simple" href={AUTHOR.github}>
              GitHub
            </Button>
            <Button variant="simple" href={AUTHOR.linkedin}>
              LinkedIn
            </Button>
          </CardFooter>
        </Card>
      </section>

      <div>
        <Button onClick={handleOpen}>Show Alert Dialog</Button>

        {isOpen && (
          <AlertDialog
            onClose={handleClose}
            alertContent={
              <div>
                <h2 className="text-2xl font-bold">Important Information</h2>
                <p className="mt-4">
                  This is the main content of the alert dialog. It can be a long
                  message, a list, or any other React node.
                </p>
              </div>
            }
            buttonProps={{
              variant: 'primary',
              color: 'red',
              disabled: false,
              loading: false,
            }}
            closeButtonText="Dismiss"
          >
            Dismiss
          </AlertDialog>
        )}
      </div>
    </main>
  )
}

export const Route = createFileRoute('/About-Us/')({
  component: AboutUsPage,
})
