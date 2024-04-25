
import { cn } from "../utils/cn";
import React from "react";
import { BentoGrid, BentoGridItem } from "./bento-grid";
import {
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";

import Image from 'next/image';
import moneyGraph from "../public/images/getMoney.jpg";
import genericGraph from "../public/images/genericGraph.jpg";
import genericLineGraph from "../public/images/genericLineGraph.jpg";
import apexChart from "../public/images/apexChart.jpg";

import ReactApexChart from 'react-apexcharts';
import { BasicLineChart } from 'components/BasicLineChart';


export function BentoGridSecondDemo() {
    return (
        <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
            {items.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    className={item.className}
                    icon={item.icon}
                />
            ))}
        </BentoGrid>
    );
}

const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);
const items = [
    {
        title: "Fake Kubecost metrics",
        description: "Jawsh and Andy's fake chart",
        // header: <Skeleton />,
        header: (
            <div className="h-full w-full relative rounded-xl">
                {/* <Image
                    src={genericLineGraph}
                    alt="Graph"
                    layout="fill" // This will make the image fill the container
                    objectFit="cover"
                /> */}
                <BasicLineChart/>
            </div>
        ),
        className: "md:col-span-2",
        icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Check out this cool graph",
        description: "Description here ",
        // header: <Skeleton />,
        header: (
            <div className="h-full w-full relative rounded-xl">
                {/* <Image
                    src={apexChart}
                    alt="Graph"
                    layout="fill" // This will make the image fill the container
                    objectFit="cover"
                /> */}
                    <BasicLineChart/>
            </div>
        ),
        className: "md:col-span-1",
        icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Get money",
        description: "Learn how you can save money on your deployment",
        // header: <Skeleton />,
        header: (
            <div className="h-full w-full relative rounded-xl">
                <Image
                    src={moneyGraph}
                    alt="Graph"
                    layout="fill" // This will make the image fill the container
                    objectFit="cover"
                />
            </div>
        ),
        className: "md:col-span-2",
        icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Generic Graph of Metric here",
        description:
            "Generic Description of graph here",
        // header: <Skeleton />,
        header: (
            <div className="h-full w-full relative rounded-xl">
                <Image
                    src={genericGraph}
                    alt="Graph"
                    layout="fill" // This will make the image fill the container
                    objectFit="cover"
                />
            </div>
        ),
        className: "md:col-span-1",
        icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
];
