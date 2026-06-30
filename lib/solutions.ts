export type SolutionStatus = "live" | "in-development";

export interface Solution {
  slug: string;
  status: SolutionStatus;
  icon: string;
  order: number;
}

export const solutions: Solution[] = [
  { slug: "fleet-mobility",        status: "in-development", icon: "⚡", order: 1 },
  { slug: "iot-hardware",          status: "in-development", icon: "◈",  order: 2 },
  { slug: "logistics-intelligence",status: "in-development", icon: "⊞",  order: 3 },
  { slug: "ai-operations",         status: "in-development", icon: "∿",  order: 4 },
];
