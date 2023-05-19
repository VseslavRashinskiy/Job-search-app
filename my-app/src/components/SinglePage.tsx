import { useParams } from 'react-router';

const SinglePage = () => {
  const { id } = useParams();

  return (
    <div className="cards" data-testid="cards">
      Hi Im {id}
    </div>
  );
};

export default SinglePage;
