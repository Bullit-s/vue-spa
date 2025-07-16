import { RootState } from '@/store';
import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RootState>;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $store: Store<RootState>;
  }
}
