
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== LIBRARY MANAGEMENT SYSTEM TEST CASES ===\n");

        // Test Case 1: Create Books
        System.out.println("TEST CASE 1: Creating Books");
        System.out.println("-----------------------------");
        Book book1 = new Book("Java Programming", "Oracle", true);
        Book book2 = new Book("Design Patterns", "Gang of Four", true);
        Book book3 = new Book("Clean Code", "Robert Martin", false); // Initially not available
        Book book4 = new Book("Spring Boot Guide", "Baeldung", true);

        System.out.println("✓ Created 4 books:");
        System.out.println("  - " + book1.getTitle() + " by " + book1.getAuthor() + " (Available: "
                + book1.getIsAvailable() + ")");
        System.out.println("  - " + book2.getTitle() + " by " + book2.getAuthor() + " (Available: "
                + book2.getIsAvailable() + ")");
        System.out.println("  - " + book3.getTitle() + " by " + book3.getAuthor() + " (Available: "
                + book3.getIsAvailable() + ")");
        System.out.println("  - " + book4.getTitle() + " by " + book4.getAuthor() + " (Available: "
                + book4.getIsAvailable() + ")");

        // Test Case 2: Create Users (Members and Librarians)
        System.out.println("\nTEST CASE 2: Creating Users");
        System.out.println("-----------------------------");
        Member member1 = new Member(1, "Alice Johnson", UserType.MEMBER);
        Member member2 = new Member(2, "Bob Smith", UserType.MEMBER);
        Librarian librarian1 = new Librarian(101, "Carol Wilson", UserType.LIBRARIAN);
        Librarian emp1 = new Librarian(1, "Andriana", UserType.LIBRARIAN);
        Librarian emp2 = new Librarian(2, "James", UserType.LIBRARIAN);
        Librarian emp3 = new Librarian(3, "Janes", UserType.LIBRARIAN);

        System.out.println("✓ Created users:");
        System.out.println("  - Member: Alice Johnson (ID: 1)");
        System.out.println("  - Member: Bob Smith (ID: 2)");
        System.out.println("  - Librarian: Carol Wilson (ID: 101)");
        System.out.println("  - Librarian: Andriana (ID: 1)");
        System.out.println("  - Librarian: James (ID: 2)");
        System.out.println("  - Librarian: Janes (ID: 3)");

        // Test Case 3: Create Library and Initialize
        System.out.println("\nTEST CASE 3: Creating Library and Adding Initial Data");
        System.out.println("-----------------------------------------------------");
        Library libraryTIM = new Library();

        // Initialize collections (fixing potential null pointer issues)
        ArrayList<Book> bookList = new ArrayList<>();
        bookList.add(book1);
        bookList.add(book2);
        bookList.add(book3);
        libraryTIM.setBooks(bookList);

        ArrayList<Member> memberList = new ArrayList<>();
        ArrayList<Librarian> librarians = new ArrayList<>();
        libraryTIM.setMembers(memberList);
        libraryTIM.setLibrarians(librarians);

        System.out.println("✓ Library created with initial books");

        // Test Case 4: Register Members and Librarians
        System.out.println("\nTEST CASE 4: Registering Users to Library");
        System.out.println("-----------------------------------------");
        libraryTIM.registerMember(member1);
        libraryTIM.registerMember(member2);
        libraryTIM.registerLibrarians(librarian1);
        libraryTIM.registerLibrarians(emp1);
        libraryTIM.registerLibrarians(emp2);
        libraryTIM.registerLibrarians(emp3);

        // Test Case 5: Test User Info Methods (Polymorphism)
        System.out.println("\nTEST CASE 5: Testing User Info Display (Polymorphism)");
        System.out.println("-----------------------------------------------------");
        System.out.println("Member 1 Info:");
        member1.getUserInfo();
        System.out.println("Member 2 Info:");
        member2.getUserInfo();
        System.out.println("Librarian Info:");
        librarian1.getUserInfo();
        System.out.println("Employee 1 Info:");
        emp1.getUserInfo();

        // Test Case 6: Test Library Access
        System.out.println("\nTEST CASE 6: Testing Library Access");
        System.out.println("-----------------------------------");
        System.out.println("Member 1 accessing library:");
        member1.accessLibarry(libraryTIM);
        System.out.println("Librarian accessing library:");
        librarian1.accessLibarry(libraryTIM);

        // Test Case 7: Test Book Operations (Borrowing)
        System.out.println("\nTEST CASE 7: Testing Book Borrowing");
        System.out.println("-----------------------------------");
        System.out.println("Attempting to borrow available book:");
        libraryTIM.borrowBook(member1, book1);

        System.out.println("Attempting to borrow unavailable book:");
        libraryTIM.borrowBook(member2, book3);

        // Test Case 8: Test Book Return
        System.out.println("\nTEST CASE 8: Testing Book Return");
        System.out.println("-------------------------------");
        book1.setIsAvailable(false); // Simulate book was borrowed
        libraryTIM.returnBook(member1, book1);
        System.out.println("Book availability after return: " + book1.getIsAvailable());

        // Test Case 9: Test Librarian Operations
        System.out.println("\nTEST CASE 9: Testing Librarian Operations");
        System.out.println("-----------------------------------------");
        System.out.println("Librarian adding new book:");
        librarian1.addNewBook(libraryTIM, book4);

        System.out.println("Employee removing a book:");
        emp1.removeBook(libraryTIM, book2);

        // Test Case 10: Test Member Borrowing Methods
        System.out.println("\nTEST CASE 10: Testing Member Borrowing Methods");
        System.out.println("----------------------------------------------");
        // Initialize borrowed books list for member1
        member1.setBorrowedBooks(new ArrayList<>());

        System.out.println("Member borrowing book:");
        member1.borrowBook(book1);

        System.out.println("Member's borrowed books:");
        if (member1.getBorrowedBooks() != null && !member1.getBorrowedBooks().isEmpty()) {
            for (Book book : member1.getBorrowedBooks()) {
                System.out.println("  - " + book.getTitle());
            }
        }

        // Test Case 11: Test Book Methods (Accessing Parent Functions)
        System.out.println("\nTEST CASE 11: Testing Book Methods (Parent Function Access)");
        System.out.println("----------------------------------------------------------");
        System.out.println("Book borrowing method:");
        book1.borrowBook(book2);

        System.out.println("Book return method:");
        book1.returnBook();

        // Test Case 12: Test Inheritance and Polymorphism
        System.out.println("\nTEST CASE 12: Testing Inheritance and Polymorphism");
        System.out.println("--------------------------------------------------");
        User[] users = { member1, member2, librarian1, emp1, emp2, emp3 };

        System.out.println("Demonstrating polymorphism - calling getUserInfo() on different user types:");
        for (User user : users) {
            user.getUserInfo();
        }

        // Test Case 13: Test Enum Usage
        System.out.println("\nTEST CASE 13: Testing UserType Enum");
        System.out.println("-----------------------------------");
        System.out.println("Member1 user type: " + member1.userType);
        System.out.println("Librarian user type: " + librarian1.userType);
        System.out.println("Employee user type: " + emp1.userType);

        // Test Case 14: Test Getter and Setter Methods
        System.out.println("\nTEST CASE 14: Testing Getter and Setter Methods");
        System.out.println("-----------------------------------------------");
        System.out.println("Original book title: " + book4.getTitle());
        book4.setTitle("Updated Spring Boot Guide");
        System.out.println("Updated book title: " + book4.getTitle());

        book4.setAuthor("Updated Baeldung Team");
        System.out.println("Updated author: " + book4.getAuthor());

        System.out.println("\n=== ALL TEST CASES COMPLETED SUCCESSFULLY ===");
    }
}