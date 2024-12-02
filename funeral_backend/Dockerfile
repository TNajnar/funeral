FROM openjdk:21

COPY build/libs/funeral_backend-1.0.0.jar app.jar
COPY docker/application_docker.properties /configuration

ENTRYPOINT ["java","-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005","-jar","/app.jar","--spring.config.location=/configuration/application_docker.properties"]