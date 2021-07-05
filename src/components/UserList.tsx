/* eslint-disable no-underscore-dangle */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faMinusSquare, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '@material-ui/core';
import { useEffect } from 'react';
import { Table, Image, Modal, Button } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { getAllUsers, getUserById, addDelId, deleteUser } from '../redux/userSlice';
import { getImageFromBuffer } from '../utilities/helper';

function UserList() {
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state.appState);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  function handleCloseDelModal() {
    dispatch(addDelId(''));
  }

  const deletePromt = (
    <Modal show={appState.delId !== ''} onHide={() => { handleCloseDelModal(); }} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure want to delete this user !</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => { handleCloseDelModal(); }}>
          Close
        </Button>
        <Button variant="danger" onClick={() => dispatch(deleteUser(appState.delId))}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
      <div>
        {deletePromt}
        <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Age</th>
                <th>Sex</th>
                <th>Member</th>
                <th>Picture</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {appState.allUser.map((user, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.sex}</td>
                    <td>
                      {(user.member
                        && <FontAwesomeIcon icon={faCheckSquare} size="2x" className="color-green" />)
                        || <FontAwesomeIcon icon={faMinusSquare} size="2x" className="color-red" />}
                    </td>
                    <td>
                        <Image src={getImageFromBuffer(user.profilePicThumbnail)} roundedCircle />
                    </td>
                    <td>
                        <IconButton onClick={() => dispatch(getUserById(user._id))}>
                          <FontAwesomeIcon icon={faEdit} />
                        </IconButton>
                    </td>
                    <td>
                        <IconButton onClick={() => {
                          dispatch(addDelId(user._id));
                        }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </IconButton>
                    </td>
                  </tr>
              ))}
            </tbody>
        </Table>
      </div>
  );
}

export default UserList;
