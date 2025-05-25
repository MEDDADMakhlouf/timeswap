"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Calendar, Clock, HelpCircle, MessageSquare, RefreshCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChatBot } from "@/components/chat-bot";

export default function HomePage() {
    return (
        <div className="min-h-dvh bg-gradient-to-b from-blue-50 to-white">
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <TestimonialsSection />
            <FaqSection />
            <ContactSection />
            <ChatBot />
        </div>
    );
}

const HeroSection = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [duration, setDuration] = useState(0);
    const [delay, setDelay] = useState(0);

    useEffect(() => {
        setPosition({ x: Math.random() * 100, y: Math.random() * 100 });
        setDelay(Math.random() * 5);
        setDuration(Math.random() * 5);
    }, []);

    return (
        <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-100 blur-3xl opacity-60" />
                <div className="absolute bottom-1/3 right-1/3 h-96 w-96 rounded-full bg-blue-200 blur-3xl opacity-40" />
            </div>

            <div className="absolute inset-0 -z-10">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-2 w-2 rounded-full bg-blue-400"
                        style={{
                            top: `${position.y}%`,
                            left: `${position.x}%`,
                        }}
                        animate={{
                            opacity: [0.2, 0.8, 0.2],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: duration,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: delay,
                        }}
                    />
                ))}
            </div>

            <div className="container px-4 mx-auto">
                <div className="grid gap-12 lg:grid-cols-2 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-blue-600 bg-blue-100 rounded-full"
                        >
                            Scheduling Made Simple
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
                        >
                            <span className="text-blue-600">TimeSwap</span> - Effortless Schedule Management
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0"
                        >
                            Streamline your scheduling process with our intuitive platform. Manage timetables,
                            swap requests, and notifications all in one place.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Link href="/auth/login">
                                <Button
                                    size="lg"
                                    className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
                                >
                                    Login <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/dashboard">
                                <Button size="lg" variant="outline">
                                    Dashboard
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.7 }}
                        className="relative"
                    >
                        <div className="relative rounded-xl overflow-hidden shadow-2xl">
                            {/* Animated glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 animate-pulse" />

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                                className="relative z-10"
                            >
                                <Image
                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9dIokdkl2rjEFyBzi7rnMRDHm1ZtNe.png"
                                    alt="TimeSwap Dashboard"
                                    width={800}
                                    height={500}
                                    className="w-full h-auto"
                                    priority
                                />
                            </motion.div>

                            <div className="absolute -bottom-3 -right-3 h-24 w-24 bg-blue-100 rounded-full blur-xl opacity-70" />
                            <div className="absolute -top-3 -left-3 h-16 w-16 bg-blue-200 rounded-full blur-xl opacity-70" />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1, duration: 0.6 }}
                            className="absolute -left-6 top-1/4 bg-white shadow-lg rounded-lg px-3 py-2 flex items-center space-x-2 z-20 text-blue-500"
                        >
                            <RefreshCw className="h-5 w-5 text-blue-500" />
                            <span className="text-sm font-medium">Easy Swaps</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                            className="absolute -right-6 top-2/3 bg-white shadow-lg rounded-lg px-3 py-2 flex items-center space-x-2 z-20 text-blue-500"
                        >
                            <Calendar className="h-5 w-5 text-blue-500" />
                            <span className="text-sm font-medium">Smart Scheduling</span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const FeaturesSection = () => {
    const features = [
        {
            icon: <Calendar className="h-6 w-6 text-blue-600" />,
            title: "Intuitive Timetable",
            description: "View and manage your schedule with our easy-to-use timetable interface.",
        },
        {
            icon: <RefreshCw className="h-6 w-6 text-blue-600" />,
            title: "Swap Requests",
            description: "Easily request and manage schedule swaps with other users.",
        },
        {
            icon: <Clock className="h-6 w-6 text-blue-600" />,
            title: "Real-time Updates",
            description: "Get instant notifications for schedule changes and swap requests.",
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose TimeSwap?</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Our platform offers powerful features to make scheduling and time management
                        effortless.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <CardSpotlight key={index} index={index}>
                            <div className="bg-white rounded-xl p-6 text-center h-full">
                                <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        </CardSpotlight>
                    ))}
                </div>
            </div>
        </section>
    );
};

import { ReactNode } from "react";

const CardSpotlight = ({ children, index = 0 }: { children: ReactNode; index?: number }) => {
    const [isMobile] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
        if (!cardRef.current || isMobile) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();

        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 * index, duration: 0.6 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative rounded-xl overflow-hidden"
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
                }}
            />
            {children}
        </motion.div>
    );
};

const HowItWorksSection = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Learn how to streamline your scheduling process with TimeSwap in just a few simple
                        steps.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center"
                    >
                        <div className="bg-blue-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-10 h-10 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7 1.274 4.057-1.512 9-5.458 9-3.947 0-6.734-4.943-8.008-9z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">View Schedule</h3>
                        <p className="text-gray-600">
                            Easily view your current schedule and identify potential swap opportunities.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-center"
                    >
                        <div className="bg-blue-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-10 h-10 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 7h12m0 0l-4-4m4 4l-4 4m-3 1h.01M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m5 3h5a2 2 0 012 2v10a2 2 0 01-2 2h-5m-1-1l-5-5v2a2 2 0 00-2 2H5a2 2 0 01-2-2v-2"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Request Swap</h3>
                        <p className="text-gray-600">
                            Submit a swap request to another user and wait for their approval.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-center"
                    >
                        <div className="bg-blue-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-10 h-10 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Confirm & Update</h3>
                        <p className="text-gray-600">
                            Once approved, your schedule is automatically updated in the system.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const TestimonialsSection = () => {
    const testimonials = [
        {
            content:
                "TimeSwap has completely transformed how our university handles class scheduling. The swap feature has reduced administrative overhead by 40%.",
            author: "Dr. Sarah Johnson",
            role: "Department Chair, State University",
            avatar: "/placeholder.svg?height=80&width=80",
            highlight: "40% reduction in administrative overhead",
        },
        {
            content:
                "As a teaching assistant, I used to spend hours trying to coordinate schedule changes. TimeSwap makes it as simple as a few clicks.",
            author: "Michael Chen",
            role: "Teaching Assistant, Tech Institute",
            avatar: "/placeholder.svg?height=80&width=80",
            highlight: "Hours saved with just a few clicks",
        },
        {
            content:
                "The intuitive interface and real-time notifications have made managing my complex teaching schedule so much easier.",
            author: "Prof. Emily Rodriguez",
            role: "Professor, Liberal Arts College",
            avatar: "/placeholder.svg?height=80&width=80",
            highlight: "Real-time schedule management",
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover how TimeSwap is helping educators and institutions streamline their
                        scheduling processes.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 * index, duration: 0.6 }}
                            whileHover={{
                                y: -5,
                                boxShadow:
                                    "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)",
                            }}
                            className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 relative border border-blue-100"
                        >
                            {/* Animated highlight */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + 0.2 * index, duration: 0.6 }}
                                className="absolute -top-4 left-4 right-4 bg-blue-600 text-white text-sm font-medium py-1 px-3 rounded-full text-center"
                            >
                                {testimonial.highlight}
                            </motion.div>

                            {/* Quote mark decoration */}
                            <div className="absolute top-4 right-4 text-6xl leading-none text-blue-200 font-serif">
                                "
                            </div>

                            <p className="text-gray-700 mb-6 relative z-10 mt-4">{testimonial.content}</p>

                            <div className="flex items-center">
                                <div className="mr-4 relative">
                                    <div className="absolute inset-0 bg-blue-200 rounded-full blur-sm opacity-70 animate-pulse" />
                                    <Image
                                        src={testimonial.avatar || "/placeholder.svg"}
                                        alt={testimonial.author}
                                        width={50}
                                        height={50}
                                        className="rounded-full relative z-10"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "How does the swap request system work?",
            answer: "When you need to change your schedule, you can send a swap request to another user. They'll receive a notification and can accept or decline. Once accepted, both schedules are automatically updated in the system.",
        },
        {
            question: "Can I use TimeSwap for my entire institution?",
            answer: "Our Enterprise plan is designed specifically for institutions. It includes features like bulk user management, custom integrations with your existing systems, and dedicated support.",
        },
        {
            question: "Is there a mobile app available?",
            answer: "Yes, TimeSwap is available on both iOS and Android. The mobile app includes all the features of the web version, allowing you to manage your schedule on the go.",
        },
        {
            question: "How secure is my scheduling data?",
            answer: "We take security seriously. All data is encrypted both in transit and at rest. We use industry-standard security practices and regular security audits to ensure your information remains protected.",
        },
        {
            question: "Can I integrate TimeSwap with other calendar systems?",
            answer: "Yes, TimeSwap supports integration with popular calendar systems like Google Calendar, Outlook, and Apple Calendar. This allows you to sync your TimeSwap schedule with your preferred calendar application.",
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Find answers to common questions about TimeSwap.
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index, duration: 0.6 }}
                            className="mb-4"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="flex justify-between items-center w-full text-left p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                            >
                                <span className="font-semibold text-gray-900">{faq.question}</span>
                                <span className="text-blue-600">
                                    {openIndex === index ? (
                                        <motion.div
                                            initial={{ rotate: 0 }}
                                            animate={{ rotate: 180 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ArrowRight className="h-5 w-5 transform rotate-90" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ rotate: 180 }}
                                            animate={{ rotate: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ArrowRight className="h-5 w-5 transform rotate-90" />
                                        </motion.div>
                                    )}
                                </span>
                            </button>

                            {openIndex === index && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="p-4 bg-white border border-blue-100 rounded-b-lg"
                                >
                                    <p className="text-gray-700">{faq.answer}</p>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ContactSection = () => {
    return (
        <section className="py-20 bg-blue-600 text-white relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-500 blur-3xl opacity-30" />
                <div className="absolute bottom-1/3 right-1/3 h-96 w-96 rounded-full bg-blue-700 blur-3xl opacity-20" />
            </div>

            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl font-bold mb-6">
                        Ready to Transform Your Scheduling Experience?
                    </h2>
                    <p className="text-blue-100 text-lg mb-8">
                        Join thousands of educators and institutions who have simplified their scheduling
                        process with TimeSwap.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/auth/login">
                            <Button size="lg" variant="secondary">
                                Get Started
                            </Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button size="lg" variant="outline">
                                View Demo
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-12 flex flex-wrap justify-center gap-8">
                        <div className="flex items-center">
                            <HelpCircle className="h-5 w-5 mr-2" />
                            <span>support@timeswap.com</span>
                        </div>
                        <div className="flex items-center">
                            <MessageSquare className="h-5 w-5 mr-2" />
                            <span>Live Chat Support</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
