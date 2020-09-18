<template>
  <section class="cns-main-menu">
    <!-- <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
    />
    <a-menu
    mode="inline"
    theme="dark"
    :selectedKeys="[selectKey]">
      <a-menu-item
      v-for="item in menus"
      :key="item.key"
      @click="changeMenu(item)">
        <router-link :to="{path: item.path }">
          <a-icon
          v-if="item.icon"
          :type="item.icon" />
          <span>{{item.title}}</span>
        </router-link>
      </a-menu-item>
    </a-menu> -->
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
    />
    <div class="right-menu">
      <!-- <template v-if="device!=='mobile'">
        <header-search class="right-menu-item" />
        <error-log class="errLog-container right-menu-item hover-effect" />
        <screenfull class="right-menu-item hover-effect" />
        <a-tooltip
          :content="$t('navbar.size')"
          effect="dark"
          placement="bottom"
        >
          <size-select class="right-menu-item hover-effect" />
        </a-tooltip>
        <lang-select class="right-menu-item hover-effect" />
      </template> -->
      <a-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img
            :src="avatar+'?imageView2/1/w/80/h/80'"
            class="user-avatar"
          >
          <i class="el-icon-caret-bottom" />
        </div>
        <a-dropdown-menu slot="dropdown">
          <router-link to="/profile/">
            <a-dropdown-item>
              {{ $t('navbar.profile') }}
            </a-dropdown-item>
          </router-link>
          <router-link to="/">
            <a-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </a-dropdown-item>
          </router-link>
          <a
            target="_blank"
            href="https://github.com/armour/vue-typescript-admin-template/"
          >
            <a-dropdown-item>
              {{ $t('navbar.github') }}
            </a-dropdown-item>
          </a>
          <a
            target="_blank"
            href="https://armour.github.io/vue-typescript-admin-docs/"
          >
            <a-dropdown-item>Docs</a-dropdown-item>
          </a>
          <a-dropdown-item
            divided
            @click.native="logout"
          >
            <span style="display:block;">
              {{ $t('navbar.logOut') }}
            </span>
          </a-dropdown-item>
        </a-dropdown-menu>
      </a-dropdown>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'

type MenuItem = {
  key: string;
  title: string;
  icon?: string;
  path: string;
  children?: MenuItem[];
}

@Component({
  name: 'Navbar',
  components: {
    Breadcrumb,
    Hamburger
  }
})

@Component
export default class Menu extends Vue {
  @Prop({ type: Array, default: [] })
  menus!: MenuItem[]

  $route: any

  @Watch('$route.path')
  onPathChange () {
    this._initMenus()
  }

  selectKey = ''

  created () {
    this._initMenus()
  }

  private _initMenus () {
    const currentMenu = this._findCurrentMenu(
      this.menus,
      this.$route.path
    ) as MenuItem
    if (!currentMenu) return
    const { key } = currentMenu
    this.selectKey = key
  }

  private _findCurrentMenu (
    menus: MenuItem[],
    currentPath: string
  ): MenuItem | null {
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i]
      const { path } = menu
      if (path === currentPath) return menu

      const currentMenu = this._findCurrentMenu(
        menu.children || [],
        currentPath
      )
      if (currentMenu) return currentMenu
    }
    return null
  }

  /**
   * 切换菜单
   */
  private changeMenu (item: MenuItem) {
    const { key } = item
    this.selectKey = key
  }
}
</script>

<style lang="scss" scoped>
// .cns-main-menu {
//   width: 100%;
//   height: 100%;
//   background: #001529;
//   .cns-menu {
//     font-family: Avenir, Helvetica, Arial, sans-serif;
//     -webkit-font-smoothing: antialiased;
//     -moz-osx-font-smoothing: grayscale;
//     width: 100%;
//     a {
//       color: #fff;
//       text-decoration: none;
//     }
//   }
//   .cns-parent-title {
//     font-size: 13px;
//     color: rgba(233, 241, 255, 0.75);
//   }
//   .cns-child-title {
//     font-size: 13px;
//     color: #fff;
//   }
//   .cns-child-title:hover {
//     color: #408fff;
//   }
//   /deep/ .cns-menu-sub {
//     background: rgb(12, 28, 53);
//   }
// }
.cns-main-menu {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background .3s;
        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
