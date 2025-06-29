# use an official maven image to build the spring boot application
FROM maven:3.8.4-openjdk-17 AS build

# Set the working directory
WORKDIR /app

#Copy the pom.xml and install dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# use and official openjdk image to run the app
FROM openjdk:17-jdk-slim

# Add CA certificates
RUN apt-get update && apt-get install -y ca-certificates && apt-get clean

# set the working directory
WORKDIR /app

# copy the built JAR file from the build stage
COPY --from=build /app/target/journalApp-0.0.1-SNAPSHOT.jar .

# expose port 8080
EXPOSE 8080

# specify the command to run the app
ENTRYPOINT ["java","-jar","journalApp-0.0.1-SNAPSHOT.jar"]

