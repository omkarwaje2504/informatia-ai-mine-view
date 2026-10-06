"use client"; // remove this line if you're not using Next.js App Router

import { useId, useMemo, useRef, useState, type ComponentType } from "react";
import Fuse from "fuse.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    ArrowUpRight,
    BarChart3,
    Bot,
    ChevronLeft,
    ChevronRight,
    ClipboardCheck,
    Clapperboard,
    Gamepad2,
    Gift,
    Globe,
    HeartPulse,
    MessageCircle,
    MonitorPlay,
    NotebookPen,
    Orbit,
    Pill,
    Printer,
    QrCode,
    ScanLine,
    Search,
    Star,
    Tv,
    Users,
    X,
} from "lucide-react";

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

export type Product = {
    name: string;
    category: string;
    description: string;
    icon: IconType;
    /** Optional product image / screenshot. Falls back to the icon tile. */
    image?: string;
};

export const PRODUCTS: Product[] = [
    {
        name: "AI Avatar",
        category: "Video",
        image: "/products/ai-avatar.png",
        icon: Bot,
        description:
            "AI-powered personalized videos that make doctor, patient and brand communication more engaging and easier to understand.",
    },
    {
        name: "Patient Education Videos",
        category: "Video",
        image: "/products/patient-education-videos.png",
        icon: Clapperboard,
        description:
            "Simple, engaging videos for disease, therapy and patient education, customizable across therapies and languages.",
    },
    {
        name: "PixPro",
        category: "Print & Digital",
        image: "/products/pixpro.png",
        icon: Printer,
        description:
            "Hyper-personalized print and digital communication tailored to individual doctors, customers and campaign needs.",
    },
    {
        name: "HScore",
        category: "Assessment",
        image: "/products/hscore.png",
        icon: ClipboardCheck,
        description:
            "Digital health-risk assessments across multiple therapy areas, generating structured results to support doctor evaluation and patient engagement.",
    },
    {
        name: "Funzo",
        category: "Engagement",
        image: "/products/funzo.png",
        icon: Gamepad2,
        description:
            "Customized games, quizzes and interactive experiences that make doctor, customer and field-force engagement more participative.",
    },
    {
        name: "RxPert",
        category: "Intelligence",
        image: "/products/rxpert.png",
        icon: BarChart3,
        description:
            "Market and prescription intelligence that transforms SKU-level competitive information into actionable business insights.",
    },
    {
        name: "Prace",
        category: "Field Force",
        image: "/products/prace.png",
        icon: Users,
        description:
            "A digital engagement platform designed to enable consistent, year-round interaction between field teams and healthcare professionals.",
    },
    {
        name: "Webie",
        category: "Web Presence",
        image: "/products/webie.png",
        icon: Globe,
        description:
            "Personalized websites that help doctors and clinics build a stronger, more accessible digital presence.",
    },
    {
        name: "Insta360",
        category: "Virtual Clinic",
        image: "/products/insta-360.png",
        icon: Orbit,
        description:
            "Interactive virtual clinic experiences that allow patients to explore a doctor's practice digitally.",
    },
    {
        name: "Enkare",
        category: "In-Clinic",
        image: "/products/enkare.png",
        icon: MonitorPlay,
        description:
            "An in-clinic digital engagement solution bringing patient education, interaction and assessment into the waiting-area experience.",
    },
    {
        name: "Kampet",
        category: "Assessment",
        image: "/products/kampet.png",
        icon: ScanLine,
        description:
            "A portable digital assessment solution combining health assessments with convenient on-the-spot report printing.",
    },
    {
        name: "QR-Enabled Solutions",
        category: "Phygital",
        image: "/products/qr.png",
        icon: QrCode,
        description:
            "Connect physical communication with digital experiences, giving doctors and patients instant access to relevant content.",
    },
    {
        name: "WhatsApp Engagement",
        category: "Messaging",
        image: "/products/whatsapp.png",
        icon: MessageCircle,
        description:
            "Personalized communication for awareness, education, reminders and ongoing patient engagement through WhatsApp.",
    },
    {
        name: "Online Reputation Management (ORM)",
        category: "Reputation",
        image: "/products/orm.png",
        icon: Star,
        description:
            "Digital solutions that help doctors and clinics strengthen their online visibility, reputation and patient connections.",
    },
    {
        name: "Google Review Solutions",
        category: "Reputation",
        image: "/products/google-review.png",
        icon: Star,
        description:
            "QR-enabled tools that simplify patient feedback and help clinics strengthen their online review presence.",
    },
    {
        name: "BigViz",
        category: "Large Screen",
        image: "/products/bigviz.png",
        icon: Tv,
        description:
            "High-impact cinema and large-screen communication designed to extend healthcare and brand visibility to wider audiences.",
    },
    {
        name: "RxPad",
        category: "Point of Care",
        image: "/products/rxpad.png",
        icon: NotebookPen,
        description:
            "Customized prescription pads that integrate brand communication into an important point-of-care touchpoint.",
    },
    {
        name: "Personalized Brand Assets",
        category: "Print & Digital",
        image: "/products/brand-assets.png",
        icon: Gift,
        description:
            "Customized magazines, calendars, frames, desk materials and other physical and digital assets designed for targeted engagement.",
    },
    {
        name: "Adherence Solutions",
        category: "Patient Support",
        image: "/products/adherence-solutions.png",
        icon: Pill,
        description:
            "Digital patient-support solutions that connect education, communication and follow-up throughout the treatment journey.",
    },
    {
        name: "Cardio App",
        category: "Cardiology",
        image: "/products/cardio-app.png",
        icon: HeartPulse,
        description:
            "A cardiology-focused digital solution supporting structured patient assessment, engagement and follow-up.",
    },
    {
        name: "Nexus Ring",
        category: "Connected",
        image: "/products/nexus-ring.png",
        icon: Orbit,
        description:
            "A connected digital touchpoint designed to extend patient engagement across assessment and follow-up.",
    },
];

type Props = {
    products?: Product[];
    /** Called when the arrow button on a card is clicked. */
    onSelect?: (product: Product) => void;
};

export default function ProductsShowcase({
    products = PRODUCTS,
    onSelect,
}: Props) {
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const swiperRef = useRef<SwiperType | null>(null);

    // unique selector so several carousels can live on one page
    const scrollbarClass = `sb-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

    const filtered = useMemo(() => {
        const q = query.trim();

        if (!q) return products;

        const fuse = new Fuse(products, {
            keys: [
                {
                    name: "name",
                    weight: 0.5,
                },
                {
                    name: "category",
                    weight: 0.3,
                },
                {
                    name: "description",
                    weight: 0.2,
                },
            ],
            threshold: 0.4,
            ignoreLocation: true,
        });

        return fuse.search(q).map((result) => result.item);
    }, [products, query]);

    const syncState = (s: SwiperType) => {
        setActiveIndex(s.activeIndex);
        setIsBeginning(s.isBeginning);
        setIsEnd(s.isEnd);
    };

    // when the last slide is reached, show total (e.g. 21/21) instead of 18/21
    const current = isEnd ? filtered.length : activeIndex + 1;

    const clearSearch = () => {
        setQuery("");
    };

    return (
        <section className="w-full bg-white py-12 sm:py-16">
            <div className="px-4 sm:px-6">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center tracking-tight text-[1.4rem] font-bold text-ink sm:text-[2.4rem] font-display"
                >
                    Our Products &amp; Solutions
                </motion.h2>

                {/* Search row: input left, button right */}
                <div className="mx-auto mt-4 sm:mt-8 w-full max-w-7xl">
                    <div className="relative">
                        <Search
                            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
                            strokeWidth={2}
                        />

                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search products, e.g. video, assessment, WhatsApp"
                            aria-label="Search products and solutions"
                            className="h-12 w-full rounded-full border border-neutral-200 bg-neutral-50 pl-11 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                        />

                        {query && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                aria-label="Clear search"
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Cards */}
                {filtered.length === 0 ? (
                    <div className="mt-4 sm:mt-8  px-4 sm:px-6 text-center">
                        <p className="text-base font-medium text-neutral-900">
                            No products match &ldquo;{query}&rdquo;
                        </p>
                        <p className="mt-1 text-sm text-neutral-500">
                            Try a different keyword, or clear the search to see everything.
                        </p>
                        <button
                            onClick={clearSearch}
                            className="mt-5 rounded-full border border-neutral-300 px-5 py-2 text-sm font-medium text-neutral-900 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                        >
                            Show all products
                        </button>
                    </div>
                ) : (
                    <>
                        <Swiper
                            // remount on a new search so position + scrollbar reset cleanly
                            key={query}
                            modules={[Scrollbar]}
                            onSwiper={(s) => {
                                swiperRef.current = s;
                                syncState(s);
                            }}
                            onSlideChange={syncState}
                            onResize={syncState}
                            grabCursor
                            watchOverflow
                            spaceBetween={16}
                            slidesPerView={1.15}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                                1280: { slidesPerView: 4 },
                            }}
                            scrollbar={{
                                el: `.${scrollbarClass}`,
                                draggable: true,
                                dragSize: 14,
                                snapOnRelease: true,
                            }}
                            className="mt-4 sm:mt-8"
                        >
                            {filtered.map((p) => {
                                const Icon = p.icon;
                                return (
                                    <SwiperSlide key={p.name} className="!h-auto">
                                        <article className="flex h-full select-none flex-col rounded-xl bg-neutral-100 p-3">
                                            {/* Visual */}
                                            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-white">
                                                {p.image ? (
                                                    <>
                                                        <img
                                                            src={p.image}
                                                            alt={p.name}
                                                            draggable={false}
                                                            className="h-full w-full object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                                    </>
                                                ) : (
                                                    <Icon
                                                        className="h-16 w-16 text-neutral-800"
                                                        strokeWidth={1.25}
                                                    />
                                                )}
                                                {/* <span className="absolute left-3 top-3 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                                                    {p.category}
                                                </span> */}
                                            </div>

                                            {/* Text */}
                                            <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
                                                <h3 className="text-base sm:text-xl  font-semibold leading-snug text-neutral-900">
                                                    {p.name}
                                                </h3>
                                                <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-neutral-600">
                                                    {p.description}
                                                </p>
                                                <div className="mt-auto flex justify-end pt-4">
                                                    <Link
                                                        href={`/connect?product=${encodeURIComponent(p.name)}`}
                                                        aria-label={`Contact us about ${p.name}`}
                                                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-200 text-neutral-800 transition-colors hover:bg-neutral-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                                                    >
                                                        <ArrowUpRight className="h-5 w-5" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </article>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>

                        {/* Counter + arrows + draggable progress */}
                        {filtered.length > 4 && (
                            <div className="mt-6 flex items-center gap-4">
                                <span className="text-sm tabular-nums text-neutral-700">
                                    {current}/{filtered.length}
                                </span>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => swiperRef.current?.slidePrev()}
                                        disabled={isBeginning}
                                        aria-label="Previous"
                                        className="rounded-full p-1.5 text-neutral-700 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => swiperRef.current?.slideNext()}
                                        disabled={isEnd}
                                        aria-label="Next"
                                        className="rounded-full p-1.5 text-neutral-700 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </div>

                                {/* Swiper's own scrollbar = draggable track. The thumb is restyled as a round knob. */}
                                <div
                                    className={`${scrollbarClass} relative h-0.5 flex-1 cursor-pointer overflow-visible rounded-full bg-neutral-300 before:absolute before:inset-x-0 before:-inset-y-3 before:content-[''] [&_.swiper-scrollbar-drag]:!-top-1.5 [&_.swiper-scrollbar-drag]:!h-3.5 [&_.swiper-scrollbar-drag]:cursor-grab [&_.swiper-scrollbar-drag]:!rounded-full [&_.swiper-scrollbar-drag]:!border-2 [&_.swiper-scrollbar-drag]:!border-neutral-900 [&_.swiper-scrollbar-drag]:!bg-white active:[&_.swiper-scrollbar-drag]:cursor-grabbing`}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}