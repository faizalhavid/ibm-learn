import java.util.List;

public class Member extends User {
    private List<Book> borrowedBooks;

    public Member(int id, String name, UserType userType) {
        super(id, name, userType);
    }

    public void borrowBook(Book book) {
        this.borrowedBooks.add(book);
    }

    public List<Book> getBorrowedBooks() {
        return borrowedBooks;
    }

    public void setBorrowedBooks(List<Book> borrowedBooks) {
        this.borrowedBooks = borrowedBooks;
    }

    @Override
    public void accessLibarry(Library library) {
        int number = 0;
        for (Book book : library.getBooks()) {
            number++;
            System.out.println(number + "." + book.getTitle() + " ( " + book.getAuthor() + " )" + "\n");
        }
    }

    @Override
    public void getUserInfo() {
        System.out.println("your account is : " + super.id + " " + super.name);
    }

}
