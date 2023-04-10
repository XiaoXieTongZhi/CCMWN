<template>
    <div >
        <button class="PrButton" :class="[size,nom]"><slot></slot></button>
    </div>
</template>
<script>
export default{
props:{
    size:{
        type:String,
        default:'base',
    },
    nom:{
        type:String,
        default:'primary',
    }
}
}
</script>
<style lang="scss" scoped>
.PrButton{
  text-align: center;
  font-size: .7125rem;
}
//大小
    .max{
        min-width: 6.25rem;
        height: 3rem;
        border-radius: 1.4375rem;
        padding: 0 1.25rem;
        line-height: 3rem;
    }
    .base{
        min-width: 5.125rem;
        height: 2.25rem;
      padding: 0 1.25rem;
        border-radius: 1.5rem;
        line-height: 2.25rem;
    }
    .small{
        min-width: 4.5rem;
        height: 2rem;
        border-radius: 1.5rem;
        padding: 0 1.25rem;
        line-height:2rem;
    }
//主次
.primary{
    background: $gray-1;
    color: $gray-10;
}
.secondary{
    background: $gray-10;
    color: $gray-1;
    border:1px solid $gray-1;
}
.cprimary{
    background: $primary-color;
    color: $gray-10;
    font-weight: 600;
}
.csecondary{
    background: $gray-10;
    color: $gray-1;
  
}
</style>