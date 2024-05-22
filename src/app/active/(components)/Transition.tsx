"use client";

import { motion } from "framer-motion";

export default function Transition({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <motion.div
            className={className}
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
            }}
        >
            {children}
        </motion.div>
    );
}
