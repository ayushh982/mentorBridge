import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "react-toastify";
import { getMyReviews } from "../../services/review.service";

const MentorReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        averageRating: 0,
        totalReviews: 0,
    });

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const res = await getMyReviews();

            setReviews(res.data);

            if (res.data.length > 0) {
                const total = res.data.reduce(
                    (sum, review) => sum + review.rating,
                    0
                );

                setStats({
                    averageRating: (
                        total / res.data.length
                    ).toFixed(1),
                    totalReviews: res.data.length,
                });
            } else {
                setStats({
                    averageRating: 0,
                    totalReviews: 0,
                });
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Failed to fetch reviews"
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-10 text-center text-lg">
                Loading reviews...
            </div>
        );
    }

    return (
        <section>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Reviews
                </h1>

                <p className="mt-2 text-gray-500">
                    Feedback received from your students.
                </p>
            </div>

            <div className="mb-8 grid gap-6 md:grid-cols-3">

                <div className="rounded-3xl border border-gray-200 bg-white p-6">
                    <p className="text-gray-500">
                        Average Rating
                    </p>

                    <h2 className="mt-3 text-4xl font-bold">
                        {stats.averageRating}
                    </h2>
                </div>

                <div className="rounded-3xl border border-gray-200 bg-white p-6">
                    <p className="text-gray-500">
                        Total Reviews
                    </p>

                    <h2 className="mt-3 text-4xl font-bold">
                        {stats.totalReviews}
                    </h2>
                </div>

                <div className="rounded-3xl border border-gray-200 bg-white p-6">
                    <p className="text-gray-500">
                        Recommendation Rate
                    </p>

                    <h2 className="mt-3 text-4xl font-bold">
                        98%
                    </h2>
                </div>

            </div>

            {reviews.length === 0 ? (

                <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center">

                    <h2 className="text-xl font-semibold">
                        No Reviews Yet
                    </h2>

                    <p className="mt-3 text-gray-500">
                        Students will appear here after submitting reviews.
                    </p>

                </div>

            ) : (

                <div className="space-y-6">

                    {reviews.map((review) => (

                        <div
                            key={review._id}
                            className="rounded-3xl border border-gray-200 bg-white p-6"
                        >

                            <div className="flex items-center justify-between">

                                <div>

                                    <h2 className="text-lg font-semibold">
                                        {review.student?.fullName}
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {new Date(
                                            review.createdAt
                                        ).toLocaleDateString()}
                                    </p>

                                </div>

                                <div className="flex">

                                    {[...Array(review.rating)].map((_, index) => (

                                        <Star
                                            key={index}
                                            size={18}
                                            className="fill-yellow-400 text-yellow-400"
                                        />

                                    ))}

                                </div>

                            </div>

                            <p className="mt-5 leading-7 text-gray-600">
                                {review.comment}
                            </p>

                        </div>

                    ))}

                </div>

            )}

        </section>
    );
};

export default MentorReviews;