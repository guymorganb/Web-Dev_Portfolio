import { Container, Card, Button, Row, Col } from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';

import { GET_ME } from '../utils/queries'
import { REMOVE_BOOK } from '../utils/mutations'

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
    // Fetch user data (returns data.me, and loading if its not finished)
    const { loading, error, data } = useQuery(GET_ME);
    ///////////////////
    if (error) {
      console.log("An error occurred:", error);
      console.log("Data:", data);
      console.log("Query result:", { loading, error, data });
      console.log("Loading:", loading);
    }

    let userData = null;
    
    if (data) {
      userData = data.me;
    }
    
  // Mutation to remove a book
  const [removeBook] = useMutation(REMOVE_BOOK);

  // Show loading screen if the query is still running
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  console.log('Saved Books:', userData?.savedBooks);
  // Function to handle book deletion
  const handleDeleteBook = async (bookId) => {
    console.log("Trying to delete book with ID:", bookId);
  
    if (!bookId) {
      console.log("No bookId provided. Aborting deletion.");
      return;
    }
  
    const token = Auth.loggedIn() ? Auth.getToken() : null;
  
    if (!token) {
      console.log("No token found. Aborting deletion.");
      return;
    }
  
    try {
      const { data } = await removeBook({
        variables: { bookId },
        refetchQueries: [{ query: GET_ME }],
      });
      //console.log("Mutation Response: ", data);
      if (!data.removeBook) {
        throw new Error('Something went wrong!');
      }
  
      // Remove book's id from localStorage upon success
      removeBookId(bookId);
    } catch (err) {
      console.error("Caught error during book deletion:", err);
    }
  };
  

  return (
    <>
      <div fluid='true' className='text-light bg-dark p-5'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData?.savedBooks?.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          
        {userData?.savedBooks?.map((book) => {
            return (
              <Col md="4" key={book._id}>
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book._id)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
