# Spring Core Concepts

## 1. Inversion of Control (IoC)
Inversion of Control is a design principle where the responsibility for object creation, configuration, and lifecycle management is transferred from application code to a framework or container.

---

## 2. Application Context
`ApplicationContext` is an interface representing the IoC container in Spring. It manages beans and their dependencies.

### Implementations:
- **XML-based configuration**
- **Annotation-based configuration**

To create an Application Context using annotations, use the `@Configuration` annotation:

```java
// ExampleApplicationConfiguration.java
@Configuration
public class ExampleApplicationConfiguration {
    // Bean definitions go here
}
```
Then, initialize the context:
```java
ApplicationContext context = new AnnotationConfigApplicationContext(ExampleApplicationConfiguration.class);
```
---
## 3. Singleton Pattern
The Singleton pattern ensures that a class has only one instance and provides a global point of access to it.
  
Example in Java:
```java
public class Singleton {
    private static Singleton instance;
    private Singleton() {
        // private constructor to prevent instantiation
    }
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

## 4. Bean
A Bean is an object that is instantiated, assembled, and managed by the Spring IoC container. Beans are defined in the application context and can be configured using XML or annotations.
### Bean Definition
A Bean definition is a configuration that describes how a bean should be created, including its class, scope, and dependencies.
### Bean Scope
Bean scope defines the lifecycle of a bean in the Spring container. Common scopes include:
- **Singleton**: A single instance per Spring IoC container (default).
- **Prototype**: A new instance is created each time the bean is requested.
- **Request**: A new instance is created for each HTTP request (only in web applications).
- **Session**: A new instance is created for each HTTP session (only in web applications).
- **Global Session**: A new instance is created for each global HTTP session (only in web applications).
- **Application**: A single instance per Spring IoC container (similar to Singleton but used in web applications).
- **Websocket**: A new instance is created for each WebSocket session (only in web applications).
- **Custom Scopes**: Custom scopes can be defined by implementing the `Scope` interface.
- **Lazy**: Beans are created only when they are requested, not at application startup.

Example of defining a bean with annotations:
```java
import org.springframework.stereotype.Component;
@Component
public class MyBean {
    public void doSomething() {
        System.out.println("Doing something!");
    }
}
```