import HeroSection from "../../components/common/HeroSection";
import TrustedCompanies from "../../components/common/TrustedCompanies";
import WhyMentorBridge from "../../components/common/WhyMentorBridge";
import FeaturedMentors from "../../components/common/FeaturedMentors";
import HowItWorks from "../../components/common/HowItWorks";
import StatsSection from "../../components/common/StatsSection";
import Testimonials from "../../components/common/Testimonials";
import FAQ from "../../components/common/FAQ";
import CTASection from "../../components/common/CTASection";

const Landing = () => {
    return (
        <>
            <HeroSection />
            <TrustedCompanies />
            <WhyMentorBridge />
            <FeaturedMentors />
            <HowItWorks />
            <StatsSection />
            <Testimonials />
            <FAQ />
            <CTASection />
        </>
    );
};

export default Landing;