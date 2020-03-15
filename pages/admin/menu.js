import React from 'react'
import Link from 'next/link'

const AdminMenu = (props) => (
  <div>
    <Link href={"/admin/manage_database?password=" + props.adminPassword}>
      <a className="btn btn-default">Zarządzanie tapetami</a>
    </Link>
    <Link href={"/admin/load_wallpapers?password=" + props.adminPassword}>
      <a className="btn btn-default">Generuj tapety</a>
    </Link>
  </div>
);

AdminMenu.getInitialProps = async (context) => {
  return {
    adminPassword: context.query.password
  }
}

export default AdminMenu;