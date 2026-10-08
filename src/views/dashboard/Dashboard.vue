<template>
    <div>
        <div class="container app__content">
            <div class="row justify-content-center">
                <div class="d-flex flex-column justify-content-between col-12 min-vh-100 pt-5 pb-2">
                    <router-view v-slot="{ Component }">
                        <transition name="fade" mode="out-in">
                            <component :is="Component"/>
                        </transition>
                    </router-view>
                    <TheFooter/>
                </div>
            </div>
        </div>
        <CustomizationsModal/>
        <ClientModal v-if="team"/>
        <TeamModal v-if="team"/>
        <BankAccountModal v-if="team"/>
        <ImportModal/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ClientModal from '@/components/clients/ClientModal';
import BankAccountModal from '@/components/bank-accounts/BankAccountModal';
import TeamModal from '@/components/team/TeamModal';
import TheFooter from '@/components/TheFooter';
import CustomizationsModal from '@/components/invoices/CustomizationsModal';
import ImportModal from '../../components/ImportModal';

export default {
  components: {
    TheFooter,
    TeamModal,
    ImportModal,
    BankAccountModal,
    ClientModal,
    CustomizationsModal,
  },
  computed: {
    ...mapGetters({
      team: 'teams/team',
    }),
  },
};
</script>
