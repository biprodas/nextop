import React from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Aspire Higher</h1>
          <h2 className="text-2xl md:text-4xl font-bold mb-6">/ Your Study Abroad Companion</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Find and manage your dream universities, professors, and programs — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="#search">
              <Button variant="outline" size="lg">
                Search Universities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose Aspire Higher?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Manage Your List</CardTitle>
              </CardHeader>
              <CardContent>
                Keep track of universities, professors, and programs in a single dashboard.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Collaborate & Share</CardTitle>
              </CardHeader>
              <CardContent>
                Share your curated lists with others, and fork theirs to customize.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>All-in-One Follow-up</CardTitle>
              </CardHeader>
              <CardContent>
                Manage mailing, follow-ups, and updates — never miss a deadline.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Your Dashboard</h2>
          <p className="max-w-2xl mx-auto text-gray-600 mb-12">
            Organize everything from applications to professor communications in one powerful, easy-to-use dashboard.
          </p>
          <Link href="/dashboard">
            <Button size="lg">Go to Dashboard</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
