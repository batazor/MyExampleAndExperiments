# Menu component

### Exanple

```js

const myItems = [
  {
    label: 'muItemOne',
    href: 'myUrl1',
  },
  {
    label: 'muItemTwo',
    href: 'myUrl2',
  }
]

<Menu items={myItems} />

```

### Items Params

#### label

Name item

`label: 'myItemOne'`

#### href

Link to site or page

`href: 'admin/todo'`

`href: 'http://example.com'`

#### order

Order element

+ **auto** (default)
+ **number** (Int (1 -> 9))
+ **reverse** (Int (9 -> 1))
+ **abc** (a -> z)
+ **abc-rev** (z -> a)

#### icon

+ **type** - type search icon
  + font-awesome
  + link

##### type: font-awesome

+ **name** - name icom font-awesome
+ **customClass** - customize, larges, transform

```js
icon: {
  type: 'font-awesome',
  name: 'fa-plus',
  customClass: 'myClass1 myClass2'
}
```

##### type: link

+ **url** - URL to icon
+ **customClass** - customize, larges, transform

```js
icon: {
  type: 'link',
  url: 'http://example.com/icon.png',
  customClass: 'myClass1 myClass2'
}
```

#### children

Children element

```js
const myItems = [
  {
    label: 'muItemOne',
    href: 'myUrl1',
    children: [
      {
        label: 'subMuItemOne',
        href: 'subMyUrl1',
      },
      {
        label: 'subMuItemTwo',
        href: 'subMyUrl2',
      }
    ]
  }
]
```
