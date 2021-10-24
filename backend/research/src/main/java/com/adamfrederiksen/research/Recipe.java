package com.adamfrederiksen.research;

public class Recipe {
    private final long id;
    private final String name;
    private final Integer rating;
    private final String description;
    private final Integer time;

    public Recipe(long id, String name,  Integer rating,  String description, Integer time) {
        this.id = id;
        this.name = name;
        this.rating = rating;
        this.description = description;
        this.time = time;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Integer getRating() { return rating;}
    public String getDescription() {
        return description;
    }
    public Integer getTime() { return time;}
}
