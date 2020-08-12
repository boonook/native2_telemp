import UserState from '@src/store/user'
import MenuState from '@src/store/menu'

class store {
    constructor() {
        this.userState = new UserState();
        this.menuState = new MenuState();
    }
}

export default new store();
