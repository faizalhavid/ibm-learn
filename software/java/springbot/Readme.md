# Spring Core Concepts
## 1. Inversion of Control (IoC)
**IoC** adalah prinsip desain di mana tanggung jawab untuk membuat, mengonfigurasi, dan mengelola siklus hidup objek **dibalik** dari kode aplikasi ke **framework** atau **container**.  
Alih-alih kita memanggil library, framework-lah yang memanggil kode kita sesuai siklus hidupnya.

---

## 2. Application Context
`ApplicationContext` adalah **interface** yang merepresentasikan **IoC container** di Spring.  
Fungsinya:
- Membuat dan menginisialisasi **Bean**.
- Mengelola siklus hidup bean.
- Menyediakan dependency injection.
- Menangani event dan internationalization (i18n).

### Implementasi umum:
- **`ClassPathXmlApplicationContext`** → konfigurasi XML di classpath.
- **`FileSystemXmlApplicationContext`** → konfigurasi XML di filesystem.
- **`AnnotationConfigApplicationContext`** → konfigurasi berbasis anotasi dan Java class.
- **`AnnotationConfigServletWebServerApplicationContext`** → khusus untuk aplikasi web Spring Boot.

### Contoh konfigurasi berbasis anotasi:
```java
// ExampleApplicationConfiguration.java
@Configuration
public class ExampleApplicationConfiguration {
    @Bean
    public MyService myService() {
        return new MyServiceImpl();
    }
}
```
### Inisialisasi manual:

```java
ApplicationContext context =
new AnnotationConfigApplicationContext(ExampleApplicationConfiguration.class);

MyService service = context.getBean(MyService.class);
service.doSomething();
```

Di Spring Boot, proses ini otomatis lewat:
```java
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```
---
## 3. Anotasi Penting di Spring

Spring menyediakan anotasi turunan dari @Component untuk membedakan peran class sesuai layer arsitektur:

- `@Component` : Penanda paling dasar untuk bean yang akan dikelola Spring. Bisa digunakan di class mana pun.

- `@Service` : Turunan @Component untuk menandai class di Business Layer.
  Bersifat semantik agar kode lebih mudah dipahami, dan memungkinkan penambahan fitur khusus di masa depan.

- `@Repository` : Turunan @Component untuk menandai Data Access Layer.
  Memiliki fitur tambahan exception translation (mengubah exception spesifik database menjadi DataAccessException).

- `@Controller` : Turunan @Component untuk menandai Web Layer.
  Meng-handle HTTP request dan mengembalikan response (biasanya untuk MVC).

- `@Configuration` : Turunan @Component untuk menandai class sumber definisi bean.
  Digunakan bersama method @Bean untuk mendaftarkan bean manual.
```shell
@Component
   ├── @Service       (Business Layer)
   ├── @Repository    (Data Access Layer)
   ├── @Controller    (Web Layer)
   └── @Configuration (Bean Definition Layer)

```

---
## 4. Bean

Bean adalah objek yang dibuat, dirangkai, dan dikelola oleh Spring IoC container.
Bean bisa didefinisikan menggunakan XML atau anotasi.
Berisi konfigurasi bagaimana sebuah bean dibuat:
- Class yang digunakan.
- Scope (lingkup hidup).
- Dependencies (ketergantungan).

### Bean Scope
Menentukan siklus hidup bean dalam container:

- `Singleton` :  satu instance per-IoC container \(default\).
- `Prototype` :  instance baru tiap kali diminta.
- `Request` :  instance baru per HTTP request \(web app\).
- `Session` :  instance baru per HTTP session \(web app\).
- `Global Session` :  instance baru per global HTTP session \(web app\).
- `Application` :  satu instance per ServletContext \(web app\).
- `WebSocket` :  instance baru per WebSocket session \(web app\).
- `Custom Scope` :  scope kustom dengan mengimplementasi interface Scope.
- `Lazy` :  bean dibuat hanya saat dibutuhkan.

Contoh bean dengan anotasi:
```java
import org.springframework.stereotype.Component;

@Component
public class MyBean {
    public void doSomething() {
        System.out.println("Doing something!");
    }
}
```
### Mengakses bean:
```java
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
public class Main {
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(MyConfig.class);
        MyBean myBean = context.getBean(MyBean.class);
        myBean.doSomething();
    }
}
```
### Duplicated Bean
Jika ada lebih dari satu bean dengan tipe yang sama, Spring akan melempar `NoUniqueBeanDefinitionException`.
Untuk mengatasi ini, kita bisa menggunakan anotasi `@Qualifier` untuk menentukan bean mana yang ingin digunakan.
```java

@Bean
public MyBean myBean() {
    return new MyBean();
}
@Bean
public MyBean anotherBean() {
    return new MyBean();
}
```
```java
Bean myBean = context.getBean("myBean", MyBean.class);
Bean anotherBean = context.getBean("anotherBean", MyBean.class);

Assertions.assertNotSame(myBean, anotherBean); 
```

#### Menggunakan `@Qualifier`
```java
@Qualifier("myBean")
private MyBean myBean;
```

#### Menggunakan `@Primary`
Jika kita ingin satu bean menjadi default ketika ada lebih dari satu bean dengan tipe yang sama, kita
bisa menggunakan anotasi `@Primary` pada bean tersebut.
```java
@Bean
@Primary
public MyBean myPrimaryBean() {
    return new MyBean();
}
```

---

## 5. Singleton Pattern (Relevansi dengan Spring)

Spring secara default membuat bean dengan scope singleton, yang mirip dengan Singleton Pattern di OOP, tetapi dengan kontrol penuh di IoC container.

Contoh Singleton di Java:
```java
public class Singleton {
    private static Singleton instance;

    private Singleton() {
        // private constructor untuk mencegah instansiasi langsung
    }

    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

Di Spring, kita cukup membuat bean dengan default scope, dan container akan menjamin hanya ada satu instance.

## Dependency Injection (DI)
**Dependency Injection (DI)** adalah teknik di mana objek menerima dependensinya dari luar, biasanya melalui konstruktor, setter, atau field injection.  
Ini memungkinkan pengelolaan dependensi yang lebih baik dan memudahkan pengujian unit.

#### Contoh tanpa DI:
```java
public class UserService {
    private UserRepository userRepository = new UserRepository();

    public void createUser(String name) {
        userRepository.save(name);
    }
}

UserService userService = new UserService();
userService.createUser("John Doe");
```
##### Contoh dengan DI:
```java
public class UserService {
    private final UserRepository userRepository;

    // Dependency di-inject melalui konstruktor
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createUser(String name) {
        userRepository.save(name);
    }
}
UserRepository userRepository = new UserRepository();
UserService userService = new UserService(userRepository);
userService.createUser("John Doe");
```

### Bean dengan Dependency Injection
Spring mendukung berbagai cara untuk melakukan DI:
- **Constructor Injection**: Dependensi di-inject melalui konstruktor.
- **Setter Injection**: Dependensi di-inject melalui setter method.
- **Field Injection**: Dependensi di-inject langsung ke field (tidak direkomendasikan karena mengurangi testability).
- **Method Injection**: Dependensi di-inject ke method tertentu saat dipanggil.
- **Interface Injection**: Dependensi di-inject melalui interface (jarang digunakan).
- **Annotation-based Injection**: Menggunakan anotasi seperti `@Autowired` untuk menginjeksi dependensi secara otomatis.
- **XML-based Injection**: Menggunakan konfigurasi XML untuk mendefinisikan dependensi.
- **Java-based Injection**: Menggunakan anotasi `@Bean` dan `@Configuration` untuk mendefinisikan dependensi dalam kode Java.
- **Profile-based Injection**: Menggunakan anotasi `@Profile` untuk mengaktifkan bean tertentu berdasarkan profil yang aktif.
- **Conditional Injection**: Menggunakan anotasi seperti `@Conditional` untuk menginjeksi bean hanya jika kondisi tertentu terpenuhi.
- **Environment-based Injection**: Menggunakan anotasi `@Value` untuk menginjeksi nilai dari properti atau environment variable.
- **Qualifier Injection**: Menggunakan anotasi `@Qualifier` untuk memilih bean tertentu ketika ada beberapa bean dengan tipe yang sama.
- **Primary Injection**: Menggunakan anotasi `@Primary` untuk menentukan bean default ketika ada beberapa bean dengan tipe yang sama.
- **Lazy Injection**: Menggunakan anotasi `@Lazy` untuk menunda pembuatan bean sampai benar-benar dibutuhkan.
- **Scope Injection**: Menggunakan anotasi `@Scope` untuk menentukan lingkup hidup bean (singleton, prototype, request, session, dll).
- **Event Injection**: Menggunakan anotasi `@EventListener` untuk menangani event yang dipicu dalam aplikasi.
- **Aspect Injection**: Menggunakan AOP (Aspect-Oriented Programming) untuk menginjeksi aspek ke dalam bean, seperti logging atau transaksi.
- **Custom Injection**: Membuat anotasi kustom untuk menginjeksi dependensi dengan cara yang spesifik sesuai kebutuhan aplikasi.
- **Configuration Injection**: Menggunakan anotasi `@ConfigurationProperties` untuk menginjeksi konfigurasi dari file properties ke dalam bean.
- **Factory Method Injection**: Menggunakan metode pabrik untuk membuat dan menginjeksi bean dengan logika khusus.
- **Prototype Injection**: Menggunakan anotasi `@Scope("prototype")` untuk membuat bean baru setiap kali diminta, memungkinkan fleksibilitas dalam pengelolaan siklus hidup bean.
- **Conditional Bean Injection**: Menggunakan anotasi `@ConditionalOnProperty` atau `@ConditionalOnClass` untuk menginjeksi bean hanya jika kondisi tertentu terpenuhi, seperti keberadaan properti atau kelas tertentu.
- **Environment-specific Injection**: Menggunakan anotasi `@Profile` untuk menginjeksi bean yang hanya aktif dalam profil tertentu, seperti `dev`, `test`, atau `prod`.
- **Configuration Class Injection**: Menggunakan anotasi `@Configuration` untuk mendefinisikan kelas konfigurasi yang menginjeksi bean lain, memungkinkan pengelolaan dependensi yang lebih terstruktur.
- **Bean Post-Processing**: Menggunakan `BeanPostProcessor` untuk melakukan modifikasi pada bean setelah dibuat, seperti menambahkan logika tambahan atau mengubah properti bean sebelum digunakan.
- **Event Publishing**: Menggunakan anotasi `@EventListener` untuk mendengarkan dan menangani event yang dipublikasikan dalam aplikasi, memungkinkan komunikasi antar komponen tanpa ketergantungan langsung.
- **Aspect-Oriented Programming (AOP)**: Menggunakan anotasi `@Aspect` untuk mendefinisikan aspek yang menginjeksi logika tambahan ke dalam bean, seperti logging, transaksi, atau keamanan, tanpa mengubah kode bisnis utama.
- **Conditional Configuration**: Menggunakan anotasi `@Conditional` untuk menentukan apakah bean harus dibuat berdasarkan kondisi tertentu, seperti keberadaan kelas, properti, atau lingkungan, memungkinkan konfigurasi yang lebih fleksibel dan dinamis.
- **Custom Annotations**: Membuat anotasi kustom untuk menginjeksi dependensi dengan cara yang spesifik sesuai kebutuhan aplikasi, seperti menginjeksi konfigurasi khusus atau logika bisnis tertentu.
- **Environment Variable Injection**: Menggunakan anotasi `@Value` untuk menginjeksi nilai dari environment variable atau file properties ke dalam bean, memungkinkan konfigurasi yang lebih fleksibel dan mudah diubah tanpa perlu mengubah kode.
- **Profile-specific Beans**: Menggunakan anotasi `@Profile` untuk mendefinisikan bean yang hanya aktif dalam profil tertentu, seperti `dev`, `test`, atau `prod`, memungkinkan pengelolaan konfigurasi yang lebih terstruktur dan sesuai dengan lingkungan aplikasi.
- **Conditional Bean Registration**: Menggunakan anotasi `@ConditionalOnMissingBean` atau `@ConditionalOnBean` untuk menginjeksi bean hanya jika bean lain tidak ada atau ada, memungkinkan pengelolaan dependensi yang lebih fleksibel dan modular.
- **Factory Bean Injection**: Menggunakan `FactoryBean` untuk membuat dan menginjeksi bean dengan logika khusus, memungkinkan pembuatan bean yang kompleks atau dinamis sesuai kebutuhan aplikasi.
- **Custom Scope Injection**: Menggunakan anotasi `@Scope` untuk mendefinisikan lingkup hidup bean kustom, seperti `@Scope("custom")`, memungkinkan pengelolaan siklus hidup bean yang lebih fleksibel dan sesuai dengan kebutuhan aplikasi.
- **Bean Validation**: Menggunakan anotasi `@Validated` untuk menginjeksi validasi ke dalam bean, memastikan bahwa data yang masuk memenuhi kriteria tertentu sebelum diproses lebih lanjut.
- **Configuration Properties Injection**: Menggunakan anotasi `@ConfigurationProperties` untuk menginjeksi konfigurasi dari file properties ke dalam bean, memungkinkan pengelolaan konfigurasi yang lebih terstruktur dan mudah diubah.
- **Environment-specific Properties**: Menggunakan anotasi `@PropertySource` untuk menginjeksi file properties tertentu ke dalam konteks aplikasi, memungkinkan pengelolaan konfigurasi yang lebih fleksibel dan sesuai dengan lingkungan aplikasi.

### Contoh Dependency Injection Sederhana dengan Bean
```java
@Bean
public Bar bar() {
    return new Bar();
}
@Bean
public Foo foo(Bar bar) {
    return new Foo(bar);
}
@Bean
public FooBar fooBar(Foo foo, Bar bar) {
    return new FooBar(foo, bar);
}
// Menggunakan DI
Foo foo = context.getBean(Foo.class);
Bar bar = context.getBean(Bar.class);
FooBar fooBar = context.getBean(FooBar.class);
```
### Memilih Dependensi dengan @Qualifier
Jika ada beberapa bean dengan tipe yang sama, kita bisa menggunakan `@Qualifier` untuk memilih bean yang tepat.
```java
@Bean
@Qualifier("primaryBar")
public Bar primaryBar() {
    return new Bar("Primary");
}
@Bean
@Qualifier("secondaryBar")
public Bar secondaryBar() {
    return new Bar("Secondary");
}
@Bean
public Foo foo(@Qualifier("primaryBar") Bar bar) {
    return new Foo(bar);
}
// Menggunakan DI dengan @Qualifier
Foo foo = context.getBean(Foo.class);
Bar primaryBar = context.getBean("primaryBar", Bar.class);
Bar secondaryBar = context.getBean("secondaryBar", Bar.class);
```
### Circular Dependency
Circular dependency terjadi ketika dua atau lebih bean saling bergantung satu sama lain, sehingga menyebabkan deadlock.
Spring dapat mengatasi circular dependency dengan menggunakan setter injection atau field injection, tetapi tidak dengan constructor injection.
```java
@Bean
public CyclicA cyclicA(CyclicB cyclicB) {
    return new CyclicA(cyclicB);
}
@Bean
public CyclicB cyclicB(CyclicC cyclicC) {
    return new CyclicB(cyclicC);
}
@Bean
public CyclicC cyclicC(CyclicA cyclicA) {
    return new CyclicC(cyclicA);
}
// Menggunakan DI dengan Circular Dependency
CyclicA cyclicA = context.getBean(CyclicA.class);
CyclicB cyclicB = context.getBean(CyclicB.class);
CyclicC cyclicC = context.getBean(CyclicC.class);

```
### Depends On
Jika kita ingin memastikan bahwa satu bean dibuat sebelum bean lain, kita bisa menggunakan anotasi `@DependsOn`.
```java
@Bean
@DependsOn("bar")
public Foo foo(Bar bar) {
    Log.info("Creating Foo with Bar: {}", bar);
    return new Foo(bar);
}
// karena foo bergantung pada bar, Spring akan memastikan bar dibuat terlebih dahulu.

@Bean
public Bar bar() {
    Log.info("Creating Bar");
    return new Bar();
}
// Menggunakan DI dengan @DependsOn
Foo foo = context.getBean(Foo.class);
Bar bar = context.getBean(Bar.class);
```
