// import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
// import Image from "next/image";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="flex p-4 items-center w-full justify-center gap-4 gradient-background2">
//       <h2 className="text-white">WECOME</h2>
//       <div className="bg-white p-1 rounded-lg">
//         <SignInButton />
//       </div>

//       <Link className="text-white" href={"/dashboard"}>
//         Dashboard
//       </Link>
//       <UserButton />
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import {
  Play,
  Zap,
  GitBranch,
  Code2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Shield,
  Rocket,
} from "lucide-react";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const { isSignedIn, user } = useUser();

  const features = [
    {
      icon: GitBranch,
      title: "Visual Workflow Builder",
      description:
        "Drag-and-drop interface to create complex AI agent workflows without writing code",
      color: "from-purple-500 to-indigo-900",
    },
    {
      icon: Zap,
      title: "AI-Powered Tools",
      description:
        "Built-in AI agents with custom instructions and integrated API tools",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: Code2,
      title: "Export & Integrate",
      description:
        "Get production-ready code to integrate agents into your applications",
      color: "from-pink-500 to-rose-600",
    },
    {
      icon: Sparkles,
      title: "Smart Logic Nodes",
      description:
        "Add conditional logic, loops, user approvals, and custom API calls",
      color: "from-amber-500 to-orange-600",
    },
  ];

  const benefits = [
    "No coding required - visual builder for everyone",
    "Deploy agents in minutes, not days",
    "Integrate with any API or service",
    "Real-time testing and preview",
    "Secure and scalable infrastructure",
    "Team collaboration features",
  ];

  const useCases = [
    {
      title: "Customer Support",
      description: "Build intelligent chatbots that handle queries 24/7",
      icon: Users,
    },
    {
      title: "Data Processing",
      description: "Automate complex data workflows with AI",
      icon: Shield,
    },
    {
      title: "Business Automation",
      description: "Connect your tools and automate repetitive tasks",
      icon: Rocket,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-lg border-b border-purple-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-900 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Agentify
              </span>
            </Link>
            <div className="flex gap-4 items-center">
              {isSignedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="px-4 py-2 text-purple-300 hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="px-4 py-2 text-purple-300 hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-white font-medium hover:from-purple-600 hover:to-indigo-700 transition-all transform hover:scale-105"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium">
                🚀 Build AI Agents Visually
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Create Powerful
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                AI Agent Workflows
              </span>
            </h1>

            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Build, test, and deploy intelligent AI agents with our intuitive
              drag-and-drop interface. No coding required. Start automating in
              minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-white font-semibold text-lg hover:from-purple-600 hover:to-indigo-700 transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-purple-500/50"
              >
                Start Building Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#features"
                className="px-8 py-4 bg-slate-800/50 border border-purple-500/30 rounded-lg text-purple-300 font-semibold text-lg hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12">
              <div>
                <div className="text-4xl font-bold text-white">2K+</div>
                <div className="text-slate-400">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white">50K+</div>
                <div className="text-slate-400">Agents Created</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white">99.9%</div>
                <div className="text-slate-400">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need to Build AI Agents
            </h2>
            <p className="text-xl text-slate-400">
              Powerful features for creating intelligent automation workflows
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                className="p-6 bg-slate-800/50 border border-purple-500/20 rounded-2xl hover:border-purple-500/50 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 transition-transform ${hoveredFeature === index ? "scale-110 rotate-3" : ""}`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Built for Your Use Case
            </h2>
            <p className="text-xl text-slate-400">
              From customer support to complex automation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/20 rounded-2xl hover:border-purple-500/50 transition-all"
              >
                <useCase.icon className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">
                  {useCase.title}
                </h3>
                <p className="text-slate-400">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Why Choose Agentify?
              </h2>
              <p className="text-xl text-slate-400 mb-8">
                The fastest way to build and deploy AI agents for your business
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-300 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-3xl opacity-20"></div>
              <div className="relative bg-slate-800 p-8 rounded-2xl border border-purple-500/30">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg">
                    <GitBranch className="w-8 h-8 text-purple-400" />
                    <div>
                      <div className="font-semibold text-white">Start Node</div>
                      <div className="text-sm text-slate-400">
                        Begin workflow
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg ml-8">
                    <Sparkles className="w-8 h-8 text-blue-400" />
                    <div>
                      <div className="font-semibold text-white">AI Agent</div>
                      <div className="text-sm text-slate-400">
                        Process with AI
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg ml-16">
                    <Zap className="w-8 h-8 text-green-400" />
                    <div>
                      <div className="font-semibold text-white">API Call</div>
                      <div className="text-sm text-slate-400">
                        Execute action
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border border-purple-500/30 rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Build Your First AI Agent?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join thousands of developers and businesses automating with
              Agentify
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sign-up"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-white font-semibold text-lg hover:from-purple-600 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/50"
              >
                Start Free Trial
              </Link>
              <Link
                href="/dashboard/pricing"
                className="px-8 py-4 bg-slate-800 border border-purple-500/30 rounded-lg text-purple-300 font-semibold text-lg hover:bg-slate-700 transition-all"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-900 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Agentify</span>
              </div>
              <p className="text-slate-400">
                Build AI agents with the power of visual workflows
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#features" className="hover:text-purple-400">
                    Features
                  </a>
                </li>
                <li>
                  <Link
                    href="/dashboard/pricing"
                    className="hover:text-purple-400"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-purple-400">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-purple-400">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-purple-500/20 text-center text-slate-400">
            <p>&copy; 2024 Agentify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
