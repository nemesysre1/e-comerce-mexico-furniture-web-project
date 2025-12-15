import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Branch {
  id: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapUrl: string;
}

interface BranchContextType {
  branches: Branch[];
  addBranch: (branch: Branch) => void;
  updateBranch: (branch: Branch) => void;
  deleteBranch: (id: string) => void;
}

const BranchContext = createContext<BranchContextType | undefined>(undefined);

const defaultBranches: Branch[] = [
  {
    id: "medan",
    city: "Medan",
    address: "Jl. Gatot Subroto No. 123, Medan",
    phone: "+62 812-3456-7890",
    email: "medan@udmexico.com",
    hours: "Senin - Sabtu: 08:00 - 17:00",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127643.34181054936!2d98.58193924335938!3d3.5951956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312e5b0e0a3b1d%3A0x4e3e52a90d7f8c6a!2sMedan%2C%20North%20Sumatra!5e0!3m2!1sen!2sid!4v1234567890123"
  },
  {
    id: "batam",
    city: "Batam",
    address: "Jl. Ahmad Yani No. 456, Batam",
    phone: "+62 813-4567-8901",
    email: "batam@udmexico.com",
    hours: "Senin - Sabtu: 08:00 - 17:00",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255302.8770732!2d103.88743545!3d1.0456045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d98bf87598ffe5%3A0xf2065c9816a909a!2sBatam%2C%20Riau%20Islands!5e0!3m2!1sen!2sid!4v1234567890123"
  },
  {
    id: "balige",
    city: "Balige",
    address: "Jl. Sisingamangaraja No. 789, Balige",
    phone: "+62 814-5678-9012",
    email: "balige@udmexico.com",
    hours: "Senin - Sabtu: 08:00 - 17:00",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63809.88516543!2d99.01744425!3d2.3317545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x302df53e8c1c6c3d%3A0x2e6f8c91e1f3e1e9!2sBalige%2C%20North%20Sumatra!5e0!3m2!1sen!2sid!4v1234567890123"
  },
  {
    id: "samosir",
    city: "Samosir",
    address: "Jl. Toba No. 321, Samosir",
    phone: "+62 815-6789-0123",
    email: "samosir@udmexico.com",
    hours: "Senin - Sabtu: 08:00 - 17:00",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255302.8770732!2d98.63823545!3d2.6056045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30320c0a32a7fed7%3A0x1a2b3c4d5e6f7a8b!2sSamosir%20Regency%2C%20North%20Sumatra!5e0!3m2!1sen!2sid!4v1234567890123"
  }
];

export function BranchProvider({ children }: { children: ReactNode }) {
  const [branches, setBranches] = useState<Branch[]>(() => {
    const saved = localStorage.getItem("branches");
    return saved ? JSON.parse(saved) : defaultBranches;
  });

  useEffect(() => {
    localStorage.setItem("branches", JSON.stringify(branches));
  }, [branches]);

  const addBranch = (branch: Branch) => {
    setBranches((prev) => [...prev, branch]);
  };

  const updateBranch = (branch: Branch) => {
    setBranches((prev) =>
      prev.map((b) => (b.id === branch.id ? branch : b))
    );
  };

  const deleteBranch = (id: string) => {
    setBranches((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <BranchContext.Provider
      value={{
        branches,
        addBranch,
        updateBranch,
        deleteBranch,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
}

export function useBranches() {
  const context = useContext(BranchContext);
  if (!context) {
    throw new Error("useBranches must be used within BranchProvider");
  }
  return context;
}
