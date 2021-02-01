//************************************************************************************************************** [MODEL] Deals with data
class Model {
    constructor() {
        this.staff = [
            {
                id: 1,
                name: 'Darras',
                rank: 'LCol',
                position: 'Commanding Officer',
                bio: `This is the commanding officer's biography`,
                longbio: `Some of these people have really long bios, so this is where that would go.`,
                imageURL: 'images/CO.jpg',
            },
            {
                id: 2,
                name: 'Paquette',
                rank: 'CWO',
                position: 'Squadron Chief',
                bio: `This is the chief's biography`,
                longbio: `This is definitely one of those people would have a really long biography.`,
                imageURL: 'images/CWO.jpg',
            },
        ]
    }

    // add a staff member
    addStaff(n, r, p, b, lb, i) {
        const staffMbr = {
            id: this.staff.length > 0 ? this.staff[this.staff.length - 1].id + 1 : 1,
            name: n,
            rank: r,
            position: p,
            bio: b,
            longbio: lb,
            imageURL: i,
        }

        this.staff.push(staffMbr);
    }
}