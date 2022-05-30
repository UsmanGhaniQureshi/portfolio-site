import { usePortfolio } from "../../store/PortfolioContext";

const ViewResume = () => {
  const { loading, personalInfo } = usePortfolio();

  if (loading) return <p>loading...</p>;
  return (
    <embed
      src={personalInfo.resumeUrl}
      width="100%"
      type="application/pdf"
      height={800}
    />
  );
};

export default ViewResume;
