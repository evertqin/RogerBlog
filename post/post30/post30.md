Title: Setup Jersey Restful service in Intellij
Author: Ruogu Qin
Date: 01/01/2016
Tag: Technology
     Java
     Jersey

Having played with Nodejs for a while, I decided to try some other web framwwork for a change, having used Tomcat a little bit, I decide to try a simple java based restful service with Jersey + Tomcat. Most of the online tutorials are based on eclipse or based on maven. Here I am using Intellij with gradle.

1. Start a new project and select gradle as project type. Also choose the Web as this may come handy in the future
![Choose gradle](/home/ruogu/Pictures/post31/choose_gradle.png)
2. Enter the GroupId and ArtifactId, then in the next screen, choose gradle version and JVM version (I use gradle 2.10 and JDK 1.8u72). Pick a project name then click "Finish"
3. To enable the build, we need to first declare some dependencies, here I am using maven repositories to get required dependencies
~~~~
group 'com.sample.gradle_sample'
version '1.0-SNAPSHOT'

apply plugin: 'java'
apply plugin: 'war'

sourceCompatibility = 1.5

repositories {
    mavenCentral()
}

dependencies {
    compile 'javax.ws.rs:javax.ws.rs-api:2.0.1'
    compile 'com.sun.jersey:jersey-server:1.8'
    testCompile group: 'junit', name: 'junit', version: '4.11'
}

~~~~
We include two dependencies for now, [javax.ws.rs](https://jax-rs-spec.java.net) will enable restful endpoints by using annotation in the code. Jersey is the required library for building restful service.
4. create src/main/java/{groupId}/test.java file, replace {groupId} with the one you specified when you setup the project.
~~~~{.java}
package com.tripplan.dev_tracker.service;

import jdk.nashorn.internal.objects.annotations.Getter;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("myresource")
public class MyResource {

    /**
     * Method handling HTTP GET requests. The returned object will be sent
     * to the client as "text/plain" media type.
     *
     * @return String that will be returned as a text/plain response.
     */
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getIt() {
        return "Got it!";
    }
}
~~~~