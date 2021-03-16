export default class Course extends HTMLElement {

    slug = 'course';  // easy identifier
    location = './_webcomponents/' + this.slug + '/'; // you shouldn't need to touch this unless you change folder structures

    folder = {};

    constructor() {
        super();
    };

        setCourses(courses) {
        const course = this;
        $.HTML(this.location + this.slug + '.html')
            .then(response => {
                const clone = response;
                $.grab('[data-heading]', clone).textContent = courses.heading;
                const table = $.grab('course-body', clone)
				courses.courselist[0].forEach(course => {
					const row = $.make('tr', '', '')
					row.appendChild($.make('td', '', course.name))
					row.appendChild($.make('td', '', course.code))
					row.appendChild($.make('td', '', course.serial))
					row.appendChild($.make('td', '', course.start))
					row.appendChild($.make('td', '', course.end))
					row.appendChild($.make('td', '', course.students))
					table.appendChild(row)
				})
                course.appendChild(clone);
            })
    };
}

customElements.define('course-list', Course);