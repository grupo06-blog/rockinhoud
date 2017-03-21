export function goToPost(id) {

    const {router} = this.context;

    if (!router.isActive('/post', null, true)) {
        router.push({
            pathname: '/post',
            query: {
                id: id
            }
        });
    }
}

export function goToHome() {

    const {router} = this.context;

    if (!router.isActive('/home', null, true)){
        router.push('/home');
    }

}

export function goToQuemSomos() {

    const {router} = this.context;

    if (!router.isActive('/quem-somos', null, true)){
        router.push('/quem-somos');
    }
}

export function goToAllPost() {

    const {router} = this.context;

    if (!router.isActive('/all-posts', null, true)){
        router.push('/all-posts');
    }
}

export function goToAllEbooks() {

    const {router} = this.context;

    if (!router.isActive('/all-ebooks', null, true)){
        router.push('/all-ebooks');
    }
}

