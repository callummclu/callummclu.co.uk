package models

import (
	"errors"
	"fmt"
	"math/rand"

	"github.com/callummclu/callummclu.co.uk/configs"
	"github.com/lib/pq"
)

type Post struct {
	ID                       int64    `json:"-"`
	Title                    string   `json:"title"`
	Description              string   `json:"description"`
	Body                     string   `json:"body"`
	Image                    string   `json:"image"`
	GithubLink               string   `json:"github"`
	SiteLink                 string   `json:"site"`
	Technologies             []string `json:"technologies"`
	IsOrganisation           bool     `json:"isorganisation"`
	OrganisationDependencies []string `json:"organisation_dependencies"`
	IsSpotlight              bool     `json:"isspotlight"`
}

type AllPostsViewModel struct {
	ID                       int64    `json:"id"`
	Title                    string   `json:"title"`
	Description              string   `json:"description"`
	Image                    string   `json:"image"`
	GithubLink               string   `json:"github"`
	SiteLink                 string   `json:"site"`
	Technologies             []string `json:"technologies"`
	IsOrganisation           bool     `json:"isorganisation"`
	OrganisationDependencies []string `json:"organisation_dependencies"`
	IsSpotlight              bool     `json:"isspotlight"`
}

type IdAndImageModel struct {
	ID    int64  `json:"id"`
	Title string `json:"title"`
	Image string `json:"image"`
}

func NewPost() *Post {
	return new(Post)
}

func (p *Post) SavePost() error {
	db, err := configs.GetDB()
	if err != nil {
		err = errors.New("DB connection error")
		return err
	}
	defer db.Close()

	insert_stmt, err := db.Prepare("INSERT INTO posts (id,title,description,body,image,technologies,github,site,isorganisation, organisation_dependencies, isspotlight) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)")

	if err != nil {
		return err
	}

	defer insert_stmt.Close()
	_, err = insert_stmt.Exec(rand.Intn(100000), p.Title, p.Description, p.Body, p.Image, pq.Array(p.Technologies), p.GithubLink, p.SiteLink, p.IsOrganisation, pq.Array(p.OrganisationDependencies), p.IsSpotlight)

	return err
}

func (p *Post) DeletePost(id string) error {
	db, err := configs.GetDB()
	if err != nil {
		err = errors.New("DB connection error")
		return err
	}
	defer db.Close()

	insert_stmt, err := db.Prepare("DELETE FROM posts WHERE id=$1")

	if err != nil {
		return err
	}

	defer insert_stmt.Close()
	_, err = insert_stmt.Exec(id)

	return err
}

func (p *Post) EditPost(id string) error {
	db, err := configs.GetDB()
	if err != nil {
		err = errors.New("DB connection error")
		return err
	}
	defer db.Close()

	insert_stmt, err := db.Prepare("UPDATE posts SET title=$1,description=$2,body=$3,image=$4,technologies=$5,github=$6,site=$7,isorganisation=$8, organisation_dependencies=$9, isspotlight=$10 WHERE id=$11")

	if err != nil {
		return err
	}

	defer insert_stmt.Close()
	_, err = insert_stmt.Exec(p.Title, p.Description, p.Body, p.Image, pq.Array(p.Technologies), p.GithubLink, p.SiteLink, p.IsOrganisation, pq.Array(p.OrganisationDependencies), p.IsSpotlight, id)

	return err
}

func (p *Post) GetPostById(query string) error {
	fmt.Println(query)
	db, err := configs.GetDB()
	if err != nil {
		err = errors.New("DB connection error")
		return err
	}
	defer db.Close()

	err = db.QueryRow("SELECT id, title, description, body, image, technologies, github, site, isorganisation,organisation_dependencies,isspotlight  FROM posts WHERE id = $1", query).Scan(&p.ID, &p.Title, &p.Description, &p.Body, &p.Image, pq.Array(&p.Technologies), &p.GithubLink, &p.SiteLink, &p.IsOrganisation, pq.Array(&p.OrganisationDependencies), &p.IsSpotlight)

	return err
}

func (p *Post) GetPostByTitle(title string) error {
	db, err := configs.GetDB()
	if err != nil {
		err = errors.New("DB connection error")
		return err
	}
	defer db.Close()

	err = db.QueryRow("SELECT id, title, description, body, image, technologies, github, site, isorganisation,organisation_dependencies,isspotlight  FROM posts WHERE title = $1", title).Scan(&p.ID, &p.Title, &p.Description, &p.Body, &p.Image, pq.Array(&p.Technologies), &p.GithubLink, &p.SiteLink, &p.IsOrganisation, pq.Array(&p.OrganisationDependencies), &p.IsSpotlight)

	return err
}
