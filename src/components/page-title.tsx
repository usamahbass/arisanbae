import { Helmet } from "react-helmet";

type PageTitleProps = {
  title: string;
};

const PageTitle = ({ title }: PageTitleProps) => (
  <Helmet>
    <title>{title} - ArisanWae</title>
  </Helmet>
);

export default PageTitle;
