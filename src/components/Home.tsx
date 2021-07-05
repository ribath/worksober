import { Row } from 'react-bootstrap';
import EditForm from './EditForm';
import UserList from './UserList';

function Home() {
  return (
    <div>
      <br />
      <Row>
        <EditForm />
      </Row>
      <br />
      <br />
      <Row className="users-list">
        <UserList />
      </Row>
    </div>
  );
}

export default Home;
