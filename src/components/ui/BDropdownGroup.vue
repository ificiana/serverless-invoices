<template>
    <div role="group">
        <h6 class="dropdown-header" v-if="header">{{ header }}</h6>
        <slot/>
    </div>
</template>

<script>
export default { name: 'BDropdownGroup', props: { header: String } };
</script>
