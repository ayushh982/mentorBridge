const Contact = () => {
    return (

        <section className="mx-auto max-w-4xl px-6 py-20">

            <h1 className="text-5xl font-bold">
                Contact Us
            </h1>

            <p className="mt-5 text-gray-500">
                We'd love to hear from you.
            </p>

            <form className="mt-12 space-y-6">

                <input
                    placeholder="Full Name"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-indigo-600"
                />

                <input
                    placeholder="Email"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-indigo-600"
                />

                <input
                    placeholder="Subject"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-indigo-600"
                />

                <textarea
                    rows={6}
                    placeholder="Message"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-indigo-600"
                />

                <button className="rounded-xl bg-indigo-600 px-8 py-3 text-white hover:bg-indigo-700">

                    Send Message

                </button>

            </form>

        </section>

    );
};

export default Contact;