import React, { useState, useEffect } from 'react';

// Define roles and their permissions
const roles = [
  { name: 'Admin', permissions: ['create', 'read', 'update', 'delete'] },
  { name: 'Editor', permissions: ['create', 'read', 'update'] },
  { name: 'Viewer', permissions: ['read'] },
];

const RoleSelector = () => {
  const [selectedRole, setSelectedRole] = useState('Viewer');
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    const role = roles.find(role => role.name === selectedRole);
    if (role) {
      setPermissions(role.permissions);
    }
  }, [selectedRole]);

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
    // Logic to apply the role to the user
  };

  return (
    <div className="mb-4">
      <label htmlFor="roleSelector" className="block text-sm font-medium text-gray-700">
        Select User Role
      </label>
      <select
        id="roleSelector"
        name="roleSelector"
        value={selectedRole}
        onChange={handleRoleChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      >
        {roles.map((role) => (
          <option key={role.name} value={role.name}>
            {role.name}
          </option>
        ))}
      </select>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700">Permissions:</h3>
        <ul className="list-disc list-inside">
          {permissions.map((permission, index) => (
            <li key={index} className="text-sm text-gray-600">{permission}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RoleSelector;