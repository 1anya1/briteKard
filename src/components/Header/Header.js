import { Helmet } from "react-helmet";

function Header(props) {
  return (
    <Helmet>
      <title className='capitalize'>{props.username ? `${props.username} BriteKard Profile` : 'Digital Business Cards Made Easy' } </title>
      <meta property="og:image" content={props.photo ? props.photo : "https://res.cloudinary.com/dwz87zxoy/image/upload/v1678223026/Frame_1_m9quqn.png"} />
    </Helmet>
  );
}

export default Header;
