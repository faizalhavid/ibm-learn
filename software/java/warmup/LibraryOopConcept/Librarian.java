
public class Librarian extends User {

    public Librarian(int id, String name, UserType userType) {
        super(id, name, userType);
    }

    @Override
    public void getUserInfo() {
        System.out.println("Your Librarian Account :" + super.id + " " + super.name);
    }

    @Override
    public void accessLibarry(Library library) {
        int number = 0;
        for (Book book : library.getBooks()) {
            number++;
            System.out.println(number + "." + book.getTitle() + " ( " + book.getAuthor() + " )" + "\n");
        }
    }

    public void addNewBook(Library library, Book book) {
        library.addBook(book, this);
    }

    public void removeBook(Library library, Book book) {
        library.removeBook(book, this);
    }
}
