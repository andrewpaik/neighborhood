"use client";

import { motion } from "motion/react";
import { MemberCard } from "./member-card";
import type { User } from "@/types";

interface MemberGridProps {
  members: User[];
  onSelect: (member: User) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export const MemberGrid = ({ members, onSelect }: MemberGridProps) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3"
    >
      {members.map((member) => (
        <motion.div key={member.id} variants={item}>
          <MemberCard member={member} onSelect={onSelect} />
        </motion.div>
      ))}
    </motion.div>
  );
};
