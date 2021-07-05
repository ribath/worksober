import React, { RefObject } from 'react';
import { Row, Col, Jumbotron, Image, Button, Form } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { changeImage,
  replaceAdress1,
  replaceAdress2,
  replaceAge,
  replaceEmail,
  toggleMember,
  replaceName,
  replaceProfilePic,
  replaceSex,
  resetForm,
  createUser,
  updateUser
} from '../redux/userSlice';
import { getImageFromBuffer, resizeFile } from '../utilities/helper';

function EditForm() {
  const appState = useAppSelector((state) => state.appState);
  const dispatch = useAppDispatch();
  const inputOpenFileRef : RefObject<HTMLInputElement> = React.createRef();

  function onSubmission(event:any) {
    event.preventDefault();
    if (appState.profilePic !== null) {
      if (appState.isAdd) {
        dispatch(createUser(appState));
      } else {
        dispatch(updateUser(appState));
      }
    } else {
      alert('Please select a photo');
    }
  }

  function showAvatar() {
    if (appState.isAdd && appState.imgUrl === '') {
      return (
        <Image id="static" src="/avatar-vector-icon-boy" rounded fluid />
      );
    } else if (appState.imgUrl !== '') {
      return (
        <Image
          id="userinput"
          className="image-style"
          src={appState.imgUrl}
          rounded
          fluid
        />
      );
    } else {
      return (
        <Image id="dynamic" src={getImageFromBuffer(appState.profilePic)} rounded fluid />
      );
    }
  }

  return (
        <Row>
            <Col md={6}>
                <Row>
                    <Jumbotron>
                        { (appState.isAdd
                            && <h3>Add User</h3>)
                            || <h3>Edit User</h3>}
                    </Jumbotron>
                </Row>
                <Form onSubmit={(event) => { onSubmission(event); }}>
                  <Form.Group>
                    <Form.Label>Name *</Form.Label>
                    <Form.Control
                      name="name"
                      placeholder="Enter User Name"
                      value={appState.name}
                      onChange={(event:any) => { dispatch(replaceName(event.target.value)); }}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      name="email"
                      placeholder="Enter Email"
                      value={appState.email}
                      type="email"
                      onChange={(event:any) => { dispatch(replaceEmail(event.target.value)); }}
                      required
                    />
                  </Form.Group>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Age *</Form.Label>
                        <Form.Control
                          name="age"
                          type="number"
                          placeholder="Enter Age"
                          value={appState.age}
                          onChange={(event:any) => { dispatch(replaceAge(event.target.value)); }}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Sex *</Form.Label>
                        <Form.Control
                          name="sex"
                          as="select"
                          defaultValue="Male"
                          value={appState.sex}
                          onChange={(event:any) => { dispatch(replaceSex(event.target.value)); }}
                          required
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group>
                    <Form.Label>Adress Line 1</Form.Label>
                    <Form.Control
                      placeholder="Enter Adress"
                      value={appState.adress1}
                      onChange={(event:any) => { dispatch(replaceAdress1(event.target.value)); }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Adress Line 2</Form.Label>
                    <Form.Control
                      placeholder="Enter Adress"
                      value={appState.adress2}
                      onChange={(event:any) => { dispatch(replaceAdress2(event.target.value)); }}
                    />
                  </Form.Group>
                  <Row>
                  <Col md={6}>
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check
                        name="member"
                        type="checkbox"
                        label="Member *"
                        checked={appState.member}
                        onChange={() => { dispatch(toggleMember()); }}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <input
                        className="hide"
                        ref={inputOpenFileRef}
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={(event) => {
                          if (event.target.files !== null) {
                            dispatch(changeImage(URL.createObjectURL(event.target.files[0])));
                            resizeFile(event.target.files[0], 512)
                              .then((value) => {
                                if (typeof value === 'string') {
                                  dispatch(replaceProfilePic(Buffer.from(value, 'base64')));
                                }
                              });
                          }
                        }}
                    />
                  </Col>
                  </Row>
                  {
                    !appState.isAdd
                    && (
                    <Button
                      variant="secondary"
                      onClick={() => { dispatch(resetForm()); }}
                    >
                      Reset Edit
                    </Button>
                    )
                  }
                  {' '}
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
            </Col>
            <Col md={6}>
              {showAvatar()}
                <br />
                <br />
                <Button
                className="btn btn-light"
                onClick={
                    () => {
                      if (inputOpenFileRef.current !== null) {
                        inputOpenFileRef.current.click();
                      }
                    }
                }
                >
                    Browse Picture
                </Button>
            </Col>
        </Row>
  );
}

export default EditForm;
