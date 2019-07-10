<template>
    <div class="layout">
        <div class="menu">
            <b-nav vertical class="w-25">
                <b-nav-item>
                    <router-link to="/contacts" tag="a">
                        <font-awesome-icon icon="address-book" />
                        Contacts
                    </router-link>
                </b-nav-item>

                <b-nav-item>
                    <router-link to="/transactions" tag="a">
                        <font-awesome-icon icon="exchange-alt" />
                        Transactions
                    </router-link>
                </b-nav-item>

                <b-nav-item disabled>
                    <font-awesome-icon icon="th-large" />
                    Blocks
                </b-nav-item>
            </b-nav>
        </div>

        <div class="content">
            <slot />
        </div>
    </div>
</template>

<style scoped>
    .layout {
        display: flex
    }

    .menu {
        padding: 20px;
        margin-top: 70px;
        white-space: nowrap;
    }

    .content {
        padding: 20px;
        margin-top: 20px;
        width: 100%;
    }

    @media screen and (max-height: calc(120px + 70px)) {
        .menu {
            margin-top: 20px;
        }
    }
</style>

<style>
    .router-link-exact-active.router-link-active {
        font-weight: bold;
    }
</style>
